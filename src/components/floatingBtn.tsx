import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/+917045263033"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-10 right-3 mb-11 w-14 h-14  bg-green-500 rounded-full flex items-center justify-center shadow-lg z-50"
    >
      <MessageCircle className="text-white" size={21} />
    </a>
  );
}
