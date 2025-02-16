CREATE TABLE "profile" (
	"user_id" text PRIMARY KEY NOT NULL,
	"codeforces_handle" text,
	"leetcode_handle" text,
	"github_handle" text,
	"twitter_handle" text,
	"linkedin_handle" text,
	"bio" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;