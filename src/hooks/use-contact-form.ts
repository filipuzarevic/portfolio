
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/sonner";
import { contactFormSchema, ContactFormValues } from "@/components/contact/contact-form-schema";

export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      // Use Web3Forms API - a free form submission service
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name: values.name,
          company: values.company,
          email: values.email,
          message: values.message,
          subject: `New Contact Form Submission from ${values.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log("Form submitted successfully:", result);
        toast.success("Your message has been sent successfully!", {
          description: "We'll get back to you as soon as possible.",
        });
        setIsSubmitted(true);
        form.reset();
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
  };

  return {
    form,
    isSubmitting,
    isSubmitted,
    onSubmit,
    resetForm
  };
};
