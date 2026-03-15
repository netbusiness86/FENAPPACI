import { useEffect } from "react";
import { useLocation } from "wouter";
import SEO from "@/components/SEO";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageHero } from "@/components/layout/PageHero";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCreatePurchaseRequest } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, CheckCircle2, ChevronDown } from "lucide-react";
import { products } from "@/data/products";
import { CountrySelect } from "@/components/ui/CountrySelect";

const formSchema = z.object({
  fullName: z.string().min(2),
  companyName: z.string().optional(),
  country: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  product: z.string().min(1),
  quantity: z.string().min(1),
  deliveryDestination: z.string().min(2),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CATEGORY_LABELS: Record<string, { fr: string; en: string }> = {
  export:     { fr: "Cultures d'Exportation", en: "Export Crops" },
  fruits:     { fr: "Fruits",                 en: "Fruits" },
  food:       { fr: "Cultures Vivrières",     en: "Food Crops" },
  vegetables: { fr: "Légumes & Épices",       en: "Vegetables & Spices" },
};

const CATEGORIES = ["export", "fruits", "food", "vegetables"] as const;

export default function Request() {
  const { t, lang } = useLanguage();
  const { toast } = useToast();
  const [location] = useLocation();
  const createMutation = useCreatePurchaseRequest();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "", companyName: "", country: "",
      email: "", phone: "", product: "",
      quantity: "", deliveryDestination: "", message: "",
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productParam = params.get("product");
    if (productParam) form.setValue("product", productParam);
  }, [form, location]);

  const onSubmit = (data: FormValues) => {
    createMutation.mutate(
      { data },
      {
        onSuccess: () => {
          toast({ title: t('general.success'), description: t('request.toast.success') });
          form.reset();
        },
        onError: () => {
          toast({ title: t('general.error'), description: t('request.toast.error'), variant: "destructive" });
        },
      }
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SEO
        titleFr="Commander des Produits Agricoles – Demande d'Achat FENAPPACI"
        titleEn="Order Agricultural Products – Purchase Request FENAPPACI"
        descFr="Passez une commande de produits agricoles de Côte d'Ivoire. Cacao, noix de cajou, café, fruits tropicaux – expédition internationale depuis Abidjan."
        descEn="Place an order for agricultural products from Ivory Coast. Cocoa, cashew nuts, coffee, tropical fruits – international shipping from Abidjan."
        canonical="/request-purchase"
        keywordsFr="commander cacao Côte d'Ivoire, acheter noix de cajou Afrique, commande produits agricoles FENAPPACI, demande achat exportation"
        keywordsEn="order cocoa Ivory Coast, buy cashew nuts Africa, order agricultural products FENAPPACI, purchase request export"
      />
      <PageHero
        title={t('request.hero.title')}
        subtitle={t('request.hero.subtitle')}
        backgroundImage="https://images.unsplash.com/photo-1586528116311-ad8ed7c80a71?w=1920&h=1080&fit=crop"
      />

      <section className="py-20 -mt-20 relative z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">

            {createMutation.isSuccess ? (
              <div className="text-center py-16">
                <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
                <h3 className="text-3xl font-display font-bold mb-4">{t('request.success.title')}</h3>
                <p className="text-lg text-muted-foreground mb-2">{t('request.success.desc')}</p>
                <p className="text-sm text-green-600 mb-8 font-medium">
                  {lang === 'fr'
                    ? 'Un email de confirmation vous a été envoyé. Notre équipe vous contactera sous 24–48h.'
                    : 'A confirmation email has been sent to you. Our team will contact you within 24–48h.'}
                </p>
                <Button onClick={() => createMutation.reset()} variant="outline">
                  {t('request.success.btn')}
                </Button>
              </div>
            ) : (
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t('form.fullname')} *</Label>
                    <Input id="fullName" {...form.register("fullName")} className="h-12 bg-gray-50" />
                    {form.formState.errors.fullName && <p className="text-red-500 text-sm">{t('validation.name')}</p>}
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <Label htmlFor="companyName">{t('form.company')}</Label>
                    <Input id="companyName" {...form.register("companyName")} className="h-12 bg-gray-50" />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('form.email')} *</Label>
                    <Input id="email" type="email" {...form.register("email")} className="h-12 bg-gray-50" />
                    {form.formState.errors.email && <p className="text-red-500 text-sm">{t('validation.email')}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t('form.phone')} *</Label>
                    <Input id="phone" {...form.register("phone")} className="h-12 bg-gray-50" />
                    {form.formState.errors.phone && <p className="text-red-500 text-sm">{t('validation.phone')}</p>}
                  </div>

                  {/* Country */}
                  <div className="space-y-2">
                    <Label>{t('form.country')} *</Label>
                    <Controller
                      name="country"
                      control={form.control}
                      render={({ field }) => (
                        <CountrySelect
                          value={field.value}
                          onChange={field.onChange}
                          lang={lang}
                          error={!!form.formState.errors.country}
                        />
                      )}
                    />
                    {form.formState.errors.country && (
                      <p className="text-red-500 text-sm">
                        {lang === 'fr' ? 'Veuillez sélectionner votre pays' : 'Please select your country'}
                      </p>
                    )}
                  </div>

                  {/* ── Product dropdown ── */}
                  <div className="space-y-2">
                    <Label htmlFor="product">{t('form.product')} *</Label>
                    <Controller
                      name="product"
                      control={form.control}
                      render={({ field }) => (
                        <div className="relative">
                          <select
                            id="product"
                            value={field.value}
                            onChange={field.onChange}
                            className="w-full h-12 px-3 pr-10 bg-gray-50 border border-input rounded-md text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-colors"
                            style={{ color: field.value ? '#111827' : '#9ca3af' }}
                          >
                            <option value="" disabled>
                              {lang === 'fr' ? '— Choisir un produit —' : '— Select a product —'}
                            </option>
                            {CATEGORIES.map(cat => {
                              const catProducts = products.filter(p => p.category === cat);
                              if (!catProducts.length) return null;
                              return (
                                <optgroup
                                  key={cat}
                                  label={`── ${CATEGORY_LABELS[cat][lang]} ──`}
                                  style={{ fontWeight: 700, color: '#16a34a' }}
                                >
                                  {catProducts.map(p => (
                                    <option key={p.id} value={p.name[lang]}>
                                      {p.name[lang]}
                                    </option>
                                  ))}
                                </optgroup>
                              );
                            })}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      )}
                    />
                    {form.formState.errors.product && (
                      <p className="text-red-500 text-sm">
                        {lang === 'fr' ? 'Veuillez sélectionner un produit' : 'Please select a product'}
                      </p>
                    )}
                  </div>

                  {/* Quantity */}
                  <div className="space-y-2">
                    <Label htmlFor="quantity">{t('form.quantity')} *</Label>
                    <Input id="quantity" {...form.register("quantity")} className="h-12 bg-gray-50" placeholder={t('request.placeholder.quantity')} />
                    {form.formState.errors.quantity && <p className="text-red-500 text-sm">{t('validation.quantity')}</p>}
                  </div>

                  {/* Delivery destination */}
                  <div className="space-y-2">
                    <Label htmlFor="deliveryDestination">{t('form.destination')} *</Label>
                    <Input id="deliveryDestination" {...form.register("deliveryDestination")} className="h-12 bg-gray-50" placeholder={t('request.placeholder.destination')} />
                    {form.formState.errors.deliveryDestination && <p className="text-red-500 text-sm">{t('validation.destination')}</p>}
                  </div>

                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">{t('form.message')}</Label>
                  <Textarea
                    id="message"
                    {...form.register("message")}
                    className="min-h-[120px] bg-gray-50 resize-y"
                    placeholder={t('request.placeholder.message')}
                  />
                </div>

                {/* Notice */}
                <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-800">
                  <span className="text-lg">📧</span>
                  <span>
                    {lang === 'fr'
                      ? 'Après envoi, vous recevrez une confirmation automatique par email. Notre équipe vous contactera sous 24–48h ouvrables.'
                      : 'After submission, you will receive an automatic email confirmation. Our team will contact you within 24–48 business hours.'}
                  </span>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-green-700 hover:bg-green-800 text-white h-14 text-lg rounded-xl shadow-lg"
                  disabled={createMutation.isPending}
                >
                  {createMutation.isPending ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      {t('general.sending')}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      {t('request.submit')}
                    </span>
                  )}
                </Button>
              </form>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}
