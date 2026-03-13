import { useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
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
import { Send, CheckCircle2 } from "lucide-react";

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

export default function Request() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [location] = useLocation();
  const createMutation = useCreatePurchaseRequest();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      country: "",
      email: "",
      phone: "",
      product: "",
      quantity: "",
      deliveryDestination: "",
      message: "",
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productParam = params.get("product");
    if (productParam) {
      form.setValue("product", productParam);
    }
  }, [form, location]);

  const onSubmit = (data: FormValues) => {
    createMutation.mutate(
      { data },
      {
        onSuccess: () => {
          toast({
            title: t('general.success'),
            description: t('request.toast.success'),
            variant: "default",
          });
          form.reset();
        },
        onError: () => {
          toast({
            title: t('general.error'),
            description: t('request.toast.error'),
            variant: "destructive",
          });
        }
      }
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
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
                <p className="text-lg text-muted-foreground mb-8">
                  {t('request.success.desc')}
                </p>
                <Button onClick={() => createMutation.reset()} variant="outline">
                  {t('request.success.btn')}
                </Button>
              </div>
            ) : (
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t('form.fullname')} *</Label>
                    <Input id="fullName" {...form.register("fullName")} className="h-12 bg-gray-50" />
                    {form.formState.errors.fullName && <p className="text-red-500 text-sm">{t('validation.name')}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyName">{t('form.company')}</Label>
                    <Input id="companyName" {...form.register("companyName")} className="h-12 bg-gray-50" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{t('form.email')} *</Label>
                    <Input id="email" type="email" {...form.register("email")} className="h-12 bg-gray-50" />
                    {form.formState.errors.email && <p className="text-red-500 text-sm">{t('validation.email')}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">{t('form.phone')} *</Label>
                    <Input id="phone" {...form.register("phone")} className="h-12 bg-gray-50" />
                    {form.formState.errors.phone && <p className="text-red-500 text-sm">{t('validation.phone')}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">{t('form.country')} *</Label>
                    <Input id="country" {...form.register("country")} className="h-12 bg-gray-50" />
                    {form.formState.errors.country && <p className="text-red-500 text-sm">{t('validation.country')}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="product">{t('form.product')} *</Label>
                    <Input id="product" {...form.register("product")} className="h-12 bg-gray-50" placeholder={t('request.placeholder.product')} />
                    {form.formState.errors.product && <p className="text-red-500 text-sm">{t('validation.product')}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">{t('form.quantity')} *</Label>
                    <Input id="quantity" {...form.register("quantity")} className="h-12 bg-gray-50" placeholder={t('request.placeholder.quantity')} />
                    {form.formState.errors.quantity && <p className="text-red-500 text-sm">{t('validation.quantity')}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deliveryDestination">{t('form.destination')} *</Label>
                    <Input id="deliveryDestination" {...form.register("deliveryDestination")} className="h-12 bg-gray-50" placeholder={t('request.placeholder.destination')} />
                    {form.formState.errors.deliveryDestination && <p className="text-red-500 text-sm">{t('validation.destination')}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t('form.message')}</Label>
                  <Textarea
                    id="message"
                    {...form.register("message")}
                    className="min-h-[120px] bg-gray-50 resize-y"
                    placeholder={t('request.placeholder.message')}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-white h-14 text-lg rounded-xl shadow-lg"
                  disabled={createMutation.isPending}
                >
                  {createMutation.isPending ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
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
