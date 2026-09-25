CREATE TABLE "commodity_prices" (
	"id" serial PRIMARY KEY,
	"name_en" text NOT NULL,
	"name_fr" text NOT NULL,
	"symbol" text NOT NULL UNIQUE,
	"icon" text DEFAULT '🌾' NOT NULL,
	"price" numeric(14,4) NOT NULL,
	"unit" text NOT NULL,
	"unit_fr" text NOT NULL,
	"change_percent" numeric(8,4) DEFAULT '0' NOT NULL,
	"is_manual" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "purchase_requests" (
	"id" serial PRIMARY KEY,
	"full_name" text NOT NULL,
	"company_name" text,
	"country" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"product" text NOT NULL,
	"quantity" text NOT NULL,
	"delivery_destination" text NOT NULL,
	"message" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
