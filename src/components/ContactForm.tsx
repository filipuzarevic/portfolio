
import React from "react";
import { Form } from "@/components/ui/form";
import { useContactForm } from "@/hooks/use-contact-form";
import ContactFormFields from "@/components/contact/contact-form-fields";
import ContactFormSuccess from "@/components/contact/contact-form-success";

const ContactForm = () => {
  const { form, isSubmitting, isSubmitted, onSubmit, resetForm } = useContactForm();

  if (isSubmitted) {
    return <ContactFormSuccess onReset={resetForm} />;
  }

  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-2xl">
      <div className="p-6 md:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <ContactFormFields isSubmitting={isSubmitting} />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ContactForm;
