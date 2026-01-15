<x-mail::message>
    # New Contact Form Message

    You have received a new message from the VIBE Store contact form.

    **From:** {{ $name }}
    **Email:** {{ $email }}
    **Subject:** {{ $subject }}

    ---

    ## Message:

    {{ $messageContent }}

    ---

    <x-mail::button :url="'mailto:' . $email">
        Reply to {{ $name }}
    </x-mail::button>

    Thanks,<br>
    {{ config('app.name') }}
</x-mail::message>