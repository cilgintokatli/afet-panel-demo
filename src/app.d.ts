import { SupabaseClient, Session } from '@supabase/supabase-js';

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>;
			getSession(): Promise<Session | null>;
		}
		interface PageData {
			session: Session | null;
		}

		interface Database {
			public: {
				Tables: {
					activities: {
						Row: {
							created_at: string | null;
							id: number;
							islem_aciklamasi: string | null;
							islemi_yapan: string | null;
							kisi_id: number | null;
							tarih: string;
						};
						Insert: {
							created_at?: string | null;
							id?: number;
							islem_aciklamasi?: string | null;
							islemi_yapan?: string | null;
							kisi_id?: number | null;
							tarih: string;
						};
						Update: {
							created_at?: string | null;
							id?: number;
							islem_aciklamasi?: string | null;
							islemi_yapan?: string | null;
							kisi_id?: number | null;
							tarih?: string;
						};
					};
					yardimlar: {
						Row: {
							barinma: string | null;
							esya: string | null;
							gida_hijyen: string | null;
							hukuksal: string | null;
							id: number;
							il: string | null;
							ilce: string | null;
							inserted_at: string;
							isim: string;
							konum: string | null;
							mahalle: string | null;
							note: string | null;
							psikolojik: string | null;
							saglik: string | null;
							sokak: string | null;
							telefon: string;
							temas_kisi: string | null;
							updated_at: string;
							yakacak: string | null;
						};
						Insert: {
							barinma?: string | null;
							esya?: string | null;
							gida_hijyen?: string | null;
							hukuksal?: string | null;
							id?: number;
							il?: string | null;
							ilce?: string | null;
							inserted_at?: string;
							isim: string;
							konum?: string | null;
							mahalle?: string | null;
							note?: string | null;
							psikolojik?: string | null;
							saglik?: string | null;
							sokak?: string | null;
							telefon: string;
							temas_kisi?: string | null;
							updated_at?: string;
							yakacak?: string | null;
						};
						Update: {
							barinma?: string | null;
							esya?: string | null;
							gida_hijyen?: string | null;
							hukuksal?: string | null;
							id?: number;
							il?: string | null;
							ilce?: string | null;
							inserted_at?: string;
							isim?: string;
							konum?: string | null;
							mahalle?: string | null;
							note?: string | null;
							psikolojik?: string | null;
							saglik?: string | null;
							sokak?: string | null;
							telefon?: string;
							temas_kisi?: string | null;
							updated_at?: string;
							yakacak?: string | null;
						};
					};
				};
				Views: {
					[_ in never]: never;
				};
				Functions: {
					[_ in never]: never;
				};
				Enums: {
					[_ in never]: never;
				};
				CompositeTypes: {
					[_ in never]: never;
				};
			};
		}

		// interface Error {}
		// interface Platform {}
	}
}
export {};
