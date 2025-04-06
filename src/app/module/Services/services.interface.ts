export interface IService {
  id?: string;
  serviceName: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  duration: string;
  durationNote: string;
  features: string[];
  serviceInludes: string[];
  processSteps: string[];
  beforeImage: string[];
  afterImage: string[];
  imageGallery: string[];
  bookingURL?: string;
  questionURL?: string;
  seoTitle?: string;
  seoDescription?: string;
  urlSlug?: string;
  tags?: string[];
  isDeleted: boolean;
}
