import { prisma } from '@/lib/db';
import { BannerManager } from '@/components/admin/BannerManager';

export default async function AdminBannerPage() {
  const slides = await prisma.bannerSlide.findMany({ orderBy: { position: 'asc' } });

  return (
    <div>
      <h1 className="font-display text-3xl text-tinta">Banner principal</h1>
      <p className="mt-1 max-w-lg text-sm text-tinta/50">
        Los slides se muestran en este orden en el carrusel del inicio. Las fotos se redimensionan
        automáticamente al subirlas para que el sitio cargue rápido.
      </p>
      <div className="mt-6">
        <BannerManager initialSlides={slides} />
      </div>
    </div>
  );
}
