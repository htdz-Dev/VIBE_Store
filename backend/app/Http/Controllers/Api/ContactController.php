<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ContactFormMail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function send(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        try {
            $recipientEmail = config('mail.contact_recipient', config('mail.from.address'));

            Mail::to($recipientEmail)->send(new ContactFormMail(
                name: $validated['name'],
                email: $validated['email'],
                subject: $validated['subject'],
                messageContent: $validated['message']
            ));

            return response()->json([
                'success' => true,
                'message' => 'Your message has been sent successfully!',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to send message. Please try again later.',
            ], 500);
        }
    }
}
