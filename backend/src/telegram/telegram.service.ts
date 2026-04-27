import { Injectable, Logger } from '@nestjs/common';

type OrderProduct = { name: string; price: number; quantity: number };

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);
  private readonly botToken = process.env.TELEGRAM_BOT_TOKEN;
  private readonly chatIds = [
    process.env.TELEGRAM_CHAT_ID,
    '878957299',
  ].filter(Boolean) as string[];

  async sendOrderNotification(order: {
    id: number;
    customerName: string;
    phone: string;
    deliveryInfo: string;
    products: OrderProduct[];
    totalPrice: number;
  }) {
    if (!this.botToken || this.chatIds.length === 0) {
      this.logger.warn('Telegram not configured — skipping notification');
      return;
    }

    const productLines = order.products
      .map((p) => `  • ${p.name} × ${p.quantity} — ${p.price * p.quantity} грн`)
      .join('\n');

    const text = [
      `🛍️ *Нове замовлення №${order.id}*`,
      ``,
      `Клієнт: ${order.customerName}`,
      `Телефон: ${order.phone}`,
      `Доставка: ${order.deliveryInfo}`,
      ``,
      `*Товари:*`,
      productLines,
      ``,
      `*Разом: ${order.totalPrice} грн*`,
    ].join('\n');

    await Promise.allSettled(
      this.chatIds.map((chatId) =>
        fetch(
          `https://api.telegram.org/bot${this.botToken}/sendMessage`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
          },
        ).catch((err) => this.logger.error(`Failed to notify chat ${chatId}`, err)),
      ),
    );
  }
}
