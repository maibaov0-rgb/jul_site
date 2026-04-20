import { Injectable, Logger } from '@nestjs/common';

type OrderProduct = { name: string; price: number; quantity: number };

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);
  private readonly botToken = process.env.TELEGRAM_BOT_TOKEN;
  private readonly chatId = process.env.TELEGRAM_CHAT_ID;

  async sendOrderNotification(order: {
    id: number;
    customerName: string;
    phone: string;
    deliveryInfo: string;
    products: OrderProduct[];
    totalPrice: number;
  }) {
    if (!this.botToken || !this.chatId) {
      this.logger.warn('Telegram not configured — skipping notification');
      return;
    }

    const productLines = order.products
      .map((p) => `  • ${p.name} × ${p.quantity} — ${p.price * p.quantity} грн`)
      .join('\n');

    const text = [
      `🛍️ *Нове замовлення №${order.id}*`,
      ``,
      `👤 ${order.customerName}`,
      `📞 ${order.phone}`,
      `📦 ${order.deliveryInfo}`,
      ``,
      `*Товари:*`,
      productLines,
      ``,
      `💰 *Разом: ${order.totalPrice} грн*`,
    ].join('\n');

    try {
      await fetch(
        `https://api.telegram.org/bot${this.botToken}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: this.chatId,
            text,
            parse_mode: 'Markdown',
          }),
        },
      );
    } catch (err) {
      this.logger.error('Failed to send Telegram notification', err);
    }
  }
}
