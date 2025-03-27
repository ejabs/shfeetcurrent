import { useState } from "react";
import { Helmet } from "react-helmet";
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import ReCAPTCHA from "react-google-recaptcha";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch(
        "https://shfeetbackend.vercel.app/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            // Include the token in your API request
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24-48 hours.",
      });

      // Reset form and reCAPTCHA
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setRecaptchaToken(null);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | SHFeet</title>
        <meta
          name="description"
          content="Get in touch with our customer service team for any inquiries or support you need."
        />
      </Helmet>

      <div className="flex min-h-screen flex-col">
        <Navbar />

        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            {/* Header */}
            <div className="mb-10 text-center">
              <h1 className="text-3xl md:text-4xl font-medium text-leather-800 mb-4">
                Contact Us
              </h1>
              <p className="text-leather-600 max-w-2xl mx-auto">
                Have questions about our products or services? We're here to
                help! Fill out the form below or use our contact information to
                get in touch.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <div className="bg-leather-50 p-6 rounded-lg mb-6">
                  <h2 className="text-xl font-medium text-leather-800 mb-4">
                    Contact Information
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-leather-700 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-leather-800">
                          Our Address
                        </p>
                        <p className="text-leather-600">
                          Dawaki, <br />
                          FCT-Abuja, <br />
                          Nigeria.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-leather-700 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-leather-800">Phone</p>
                        <p className="text-leather-600">+234 813 326 7721</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-leather-700 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-leather-800">Email</p>
                        <p className="text-leather-600">
                          shfeet.com.ng@gmail.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-leather-700 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-leather-800">
                          Business Hours
                        </p>
                        <p className="text-leather-600">
                          Monday - Friday: 9am - 6pm <br />
                          Saturday: 10am - 5pm <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm border border-leather-100 p-6">
                  <h2 className="text-xl font-medium text-leather-800 mb-6">
                    Send Us a Message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-sm font-medium text-leather-700"
                        >
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium text-leather-700"
                        >
                          Your Email <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="subject"
                        className="text-sm font-medium text-leather-700"
                      >
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What is this regarding?"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium text-leather-700"
                      >
                        Message <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        rows={6}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="bg-leather-700 hover:bg-leather-800 w-full md:w-auto"
                      disabled={isSending}
                    >
                      {isSending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-lg overflow-hidden border border-leather-100 h-80 bg-leather-50 flex items-center justify-center">
              <p className="text-leather-500">Map would be displayed here</p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
