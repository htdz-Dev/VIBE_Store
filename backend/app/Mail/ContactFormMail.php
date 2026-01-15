<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactFormMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $name,
        public string $email,
        public string $subject,
        public string $messageContent
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Contact Form: ' . $this->subject,
            replyTo: [$this->email],
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.contact-form',
            with: [
                'name' => $this->name,
                'email' => $this->email,
                'subject' => $this->subject,
                'messageContent' => $this->messageContent,
            ],
        );
    }
}
