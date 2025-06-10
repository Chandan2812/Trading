import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/+918368284948"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-0 right-6 mb-11 w-12 h-12  bg-green-500 rounded-full flex items-center justify-center shadow-lg z-50"
    >
      <MessageCircle className="text-white" size={21} />
    </a>
  );
}
