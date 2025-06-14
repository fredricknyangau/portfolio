import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Calendar,
  MessageCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isCalendlyOpen && !document.getElementById("calendly-widget-script")) {
      const script = document.createElement("script");
      script.id = "calendly-widget-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [isCalendlyOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email address",
        description: "Please enter a valid email.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "Message sent successfully! ✨",
        description:
          "Thank you for reaching out. I'll get back to you within 24 hours.",
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to send message",
        description: "Please try again later or use another contact method.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "nyangaufredrick443@gmail.com",
      href: "mailto:nyangaufredrick443@gmail.com",
      description: "Drop me a line anytime",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+254 746730585",
      href: "tel:+254746730585",
      description: "Mon-Fri 9AM-6PM EAT",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Nakuru, Kenya",
      href: "#",
      description: "Available for remote work",
    },
  ];

  const quickActions = [
    {
      icon: Calendar,
      title: "Schedule a Call",
      description: "Book a 30-min consultation",
      action: "Schedule",
      color: "from-blue-500 to-purple-600",
      actionType: "schedule",
    },
    {
      icon: MessageCircle,
      title: "Quick Chat",
      description: "Let's discuss your project",
      action: "Start Chat",
      color: "from-green-500 to-emerald-600",
      href: "https://wa.me/254746730585",
      actionType: "chat",
    },
  ];

  const handleQuickAction = (action: (typeof quickActions)[0]) => {
    if (action.actionType === "schedule") {
      setIsCalendlyOpen(true);
    } else if (action.actionType === "chat" && action.href) {
      window.open(action.href, "_blank");
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-20">
          <span className="text-primary font-semibold text-lg mb-4 block">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            Let's Work Together
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to transform your ideas into exceptional digital experiences?
            I'm here to help bring your vision to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Contact Info and Actions */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                I'm currently available for new projects and always excited to
                discuss innovative ideas. Whether you need a consultation or
                want to start a project, I'm here to help.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map(
                ({ icon: Icon, title, value, href, description }) => (
                  <div key={title} className="group">
                    <div className="flex items-start space-x-4 p-4 rounded-2xl glass-effect border hover:border-primary transition-all duration-300 hover-lift">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-purple-600 text-white group-hover:scale-110 transition-transform duration-300">
                        <Icon size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold mb-1">{title}</p>
                        <a
                          href={href}
                          className="text-primary hover:text-primary/80 block mb-1"
                        >
                          {value}
                        </a>
                        <p className="text-sm text-muted-foreground">
                          {description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Quick Actions</h4>
              {quickActions.map(
                ({
                  icon: Icon,
                  title,
                  description,
                  action,
                  color,
                  ...rest
                }) => (
                  <Card
                    key={title}
                    className="glass-effect border-0 hover-lift group cursor-pointer"
                    onClick={() =>
                      handleQuickAction({
                        icon: Icon,
                        title,
                        description,
                        action,
                        color,
                        ...rest,
                      })
                    }
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-3 rounded-xl bg-gradient-to-br ${color} text-white group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon size={20} />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-semibold group-hover:text-primary transition-colors duration-300">
                            {title}
                          </h5>
                          <p className="text-sm text-muted-foreground">
                            {description}
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          {action}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="glass-effect border-0">
              <CardHeader>
                <CardTitle className="text-2xl">Send me a message</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and I'll get back to you as soon as
                  possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      name="name"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email *"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Input
                    name="subject"
                    placeholder="Subject *"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                  <Textarea
                    name="message"
                    placeholder="Tell me about your project... *"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                    disabled={loading}
                  >
                    <Send size={20} className="mr-2" />
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-16 border-t border-border/50">
          <div className="glass-effect rounded-2xl p-8 border">
            <p className="text-muted-foreground mb-4">
              © {new Date().getFullYear()} Fredrick Nyang'au. Crafted with
              passion using React, TypeScript & Tailwind CSS.
            </p>
          </div>
        </div>
      </div>

      {/* Calendly Modal */}
      <Dialog open={isCalendlyOpen} onOpenChange={setIsCalendlyOpen}>
        <DialogContent
          className="max-w-xl w-full p-0 overflow-hidden"
          aria-describedby=""
        >
          <DialogHeader className="p-4">
            <DialogTitle>Book a Call</DialogTitle>
          </DialogHeader>
          <div
            className="calendly-inline-widget w-full h-[500px]"
            data-url="https://calendly.com/nyangaufredrick443/30min"
          ></div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ContactSection;
