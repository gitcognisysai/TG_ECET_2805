import SiteLayout from "@/components/layout/SiteLayout";
import PageBanner from "@/components/layout/PageBanner";

export default function About() {
  return (
    <SiteLayout>
      <PageBanner
        title="About TG ECET-2026"
        crumbs={[{ label: "About" }]}
      />

      <div className="container mx-auto max-w-5xl py-12 px-4 space-y-12">
        <section className="prose prose-slate max-w-none">
          <h2 className="text-3xl font-serif font-bold text-primary mb-6">
            Introduction
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Telangana Engineering Common Entrance Test for Diploma Holders of
            Engineering/Technology in short form as TG ECET (WP)- 2026
            is being conducted by Osmania University Hyderabad on behalf of the
            Telangana Council of Higher Education (TGCHE) for the academic year
            2026-2027. This examination is the prerequisite for lateral entry
            admission into 2nd year regular B.E./B.Tech. courses in both
            University and Un-Aided Private Professional Institutions (Minority &
            Non-Minority).
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Osmania University Hyderabad, Telangana is a place of Academic
            Excellence. Bringing the spark of knowledge to young minds and
            instilling a new confidence and vigor to face the world, it is
            providing quality Technical Education for 100 plus years. Telangana
            Council of Higher Education (TGCHE) has delegated the task to{" "}
            <b>
              Osmania University for conducting the most prestigious Telangana
              Engineering Common Entrance Test (TG ECET (WP)-2026) for this year
              2026.
            </b>
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed">
            The TG ECET (WP)-2026 is being conducted through <b>ONLINE</b> mode only.
          </p>
        </section>
      </div>
    </SiteLayout>
  );
}