'use client';
import  Link  from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  BarChart3, 
  Users, 
  Package, 
  CreditCard, 
  Shield, 
  Zap, 
  Globe,
  ArrowRight,
  Check,
  Star
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: ShoppingCart,
    title: "Lightning Fast Checkout",
    description: "Process sales in seconds with our intuitive POS terminal designed for speed.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Track sales, inventory, and customer insights with powerful dashboards.",
  },
  {
    icon: Users,
    title: "Customer Management",
    description: "Build loyalty with integrated CRM and customer profiles.",
  },
  {
    icon: Package,
    title: "Inventory Control",
    description: "Never run out of stock with smart inventory tracking and alerts.",
  },
  {
    icon: CreditCard,
    title: "Multi-payment Support",
    description: "Accept cards, cash, digital wallets, and custom payment methods.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade encryption and compliance for your business data.",
  },
];

const stats = [
  { value: "50K+", label: "Active Businesses" },
  { value: "$2B+", label: "Processed Monthly" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "24/7", label: "Support" },
];

const testimonials = [
  {
    quote: "SwiftPOS transformed our checkout experience. Sales are up 40% since switching.",
    author: "Sarah Chen",
    role: "Owner, Urban Cafe",
    rating: 5,
  },
  {
    quote: "The analytics alone paid for the subscription in the first month.",
    author: "Marcus Johnson",
    role: "Manager, TechStore Pro",
    rating: 5,
  },
  {
    quote: "Finally, a POS system that actually makes sense. Intuitive and powerful.",
    author: "Elena Rodriguez",
    role: "Founder, Boutique Studio",
    rating: 5,
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "49",
    description: "Perfect for small businesses just getting started",
    features: ["1 Terminal", "Basic Analytics", "Email Support", "500 Products"],
    popular: false,
  },
  {
    name: "Professional",
    price: "99",
    description: "For growing businesses that need more power",
    features: ["5 Terminals", "Advanced Analytics", "Priority Support", "Unlimited Products", "Customer CRM", "Inventory Alerts"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "249",
    description: "For large operations with complex needs",
    features: ["Unlimited Terminals", "Custom Reports", "Dedicated Manager", "API Access", "Multi-location", "Custom Integrations"],
    popular: false,
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary">SwiftPOS</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Testimonials
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button variant="hero" asChild>
              <Link href="/register">Start Free Trial</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Globe className="w-4 h-4" />
              Trusted by 50,000+ businesses worldwide
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6"
            >
              The Modern POS System{" "}
              <span className="text-gradient-primary">Built for Speed</span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              Streamline your retail operations with our enterprise-grade point of sale system. 
              Fast checkouts, powerful analytics, and seamless inventory management.
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button variant="hero" size="xl" asChild>
                <Link href="/register">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link href="/login">View Demo</Link>
              </Button>
            </motion.div>

            <motion.p 
              variants={fadeInUp}
              className="text-sm text-muted-foreground mt-4"
            >
              No credit card required • 14-day free trial
            </motion.p>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Grow
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you sell more, faster, and smarter.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-elegant hover:shadow-elevated transition-all duration-300 border border-border/50"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your business. Scale as you grow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-card rounded-2xl p-8 shadow-elegant border-2 transition-all duration-300 ${
                  plan.popular 
                    ? "border-primary shadow-glow scale-105" 
                    : "border-border/50 hover:border-primary/30"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3 text-sm">
                      <Check className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={plan.popular ? "hero" : "outline"} 
                  className="w-full"
                  asChild
                >
                  <Link href="/register">Get Started</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Loved by Businesses Everywhere
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what our customers have to say about SwiftPOS.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-elegant border border-border/50"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-warning fill-warning" />
                  ))}
                </div>
                <p className="text-foreground mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div 
            className="bg-primary rounded-3xl p-12 text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of businesses using SwiftPOS to streamline their operations.
            </p>
            <Button variant="accent" size="xl" asChild>
              <Link href="/register">
                Start Your Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">SwiftPOS</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 SwiftPOS. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
