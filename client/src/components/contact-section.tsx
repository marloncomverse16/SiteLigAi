import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/contacts", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo contato! Responderemos em breve.",
      });
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Houve um problema ao enviar sua mensagem. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      contactMutation.mutate(formData);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contato" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          <div className="mb-12 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--ligai-dark)] mb-6">
              Entre em Contato
            </h2>
            <p className="text-xl text-[var(--ligai-gray)] mb-8">
              Nossa equipe está pronta para ajudar você a implementar o LigAI em sua empresa.
            </p>

            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 gradient-orange-yellow rounded-lg flex items-center justify-center mr-4">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--ligai-dark)]">Telefone</h4>
                  <p className="text-[var(--ligai-gray)]">(11) 3456-7890</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 gradient-orange-yellow rounded-lg flex items-center justify-center mr-4">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--ligai-dark)]">E-mail</h4>
                  <p className="text-[var(--ligai-gray)]">contato@ligai.com.br</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 gradient-orange-yellow rounded-lg flex items-center justify-center mr-4">
                  <MapPin className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--ligai-dark)]">Endereço</h4>
                  <p className="text-[var(--ligai-gray)]">São Paulo, SP - Brasil</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[var(--ligai-light)] p-8 rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="text"
                  name="name"
                  placeholder="Nome"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--ligai-orange)] focus:border-transparent outline-none w-full"
                  required
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--ligai-orange)] focus:border-transparent outline-none w-full"
                  required
                />
              </div>
              <Input
                type="text"
                name="company"
                placeholder="Empresa"
                value={formData.company}
                onChange={handleInputChange}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--ligai-orange)] focus:border-transparent outline-none w-full"
              />
              <Input
                type="tel"
                name="phone"
                placeholder="Telefone"
                value={formData.phone}
                onChange={handleInputChange}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--ligai-orange)] focus:border-transparent outline-none w-full"
              />
              <Textarea
                name="message"
                placeholder="Mensagem"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--ligai-orange)] focus:border-transparent outline-none w-full resize-none"
                required
              />
              <Button
                type="submit"
                disabled={contactMutation.isPending}
                className="w-full gradient-orange-yellow text-white px-6 py-3 rounded-lg font-semibold hover:shadow-glow transform hover:scale-105 transition-all duration-300"
              >
                {contactMutation.isPending ? "Enviando..." : "Enviar Mensagem"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
