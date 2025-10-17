
import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import StaggeredChildren from "@/components/ui/staggered-children";

interface ContactFormFieldsProps {
  isSubmitting: boolean;
}

const ContactFormFields = ({ isSubmitting }: ContactFormFieldsProps) => {
  const form = useFormContext();
  
  return (
    <StaggeredChildren animation="animate-fade-up" staggerDelay={100} baseDelay={100}>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="mb-6">
            <FormLabel className="mb-2 block">Full Name</FormLabel>
            <FormControl>
              <Input
                placeholder="Your name"
                {...field}
                className="border-gray-300 focus:border-agency-navy focus:ring-agency-navy/20 transition-all"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="company"
        render={({ field }) => (
          <FormItem className="mb-6">
            <FormLabel className="mb-2 block">Company</FormLabel>
            <FormControl>
              <Input
                placeholder="Your company name"
                {...field}
                className="border-gray-300 focus:border-agency-navy focus:ring-agency-navy/20 transition-all"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="mb-6">
            <FormLabel className="mb-2 block">Email</FormLabel>
            <FormControl>
              <Input
                placeholder="Your email address"
                {...field}
                className="border-gray-300 focus:border-agency-navy focus:ring-agency-navy/20 transition-all"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="message"
        render={({ field }) => (
          <FormItem className="mb-6">
            <FormLabel className="mb-2 block">Message</FormLabel>
            <FormControl>
              <Textarea
                placeholder="How can we help you?"
                className="min-h-32 border-gray-300 focus:border-agency-navy focus:ring-agency-navy/20 transition-all"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="pt-2">
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center bg-agency-navy text-white border-2 border-agency-navy hover:bg-white hover:text-agency-navy font-semibold px-6 py-3 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </div>
      
      <div className="text-center text-sm text-gray-500 mt-4">
        By submitting this form, you agree to our privacy policy and terms of service.
      </div>
    </StaggeredChildren>
  );
};

export default ContactFormFields;
