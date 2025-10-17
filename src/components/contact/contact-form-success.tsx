
import React from "react";
import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";

interface ContactFormSuccessProps {
  onReset: () => void;
}

const ContactFormSuccess = ({ onReset }: ContactFormSuccessProps) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 border border-gray-100 text-center">
      <div className="mb-6 flex justify-center">
        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center animate-zoom-in">
          <CircleCheck className="h-8 w-8 text-green-600" />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2 animate-fade-up">Thank You!</h3>
      <p className="text-gray-600 mb-6 animate-fade-up">
        We've received your message and will get back to you within 24 hours.
      </p>
      <Button 
        onClick={onReset} 
        className="bg-agency-purple hover:bg-agency-navy text-white transition-all duration-300"
      >
        Send Another Message
      </Button>
    </div>
  );
};

export default ContactFormSuccess;
