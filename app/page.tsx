export default function Home() {
  return (
    <div className="font-sans bg-[#DADADA] text-black">
      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center pt-20 border-b border-black/10"
      >
        <span className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight uppercase text-black/40 select-none">
          hero section
        </span>
      </section>

      {/* Project Section */}
      <section
        id="projects"
        className="min-h-screen flex items-center justify-center border-b border-black/10"
      >
        <span className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight uppercase text-black/40 select-none">
          project section
        </span>
      </section>

      {/* Who Am I Section */}
      <section
        id="about"
        className="min-h-screen flex items-center justify-center border-b border-black/10"
      >
        <span className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight uppercase text-black/40 select-none">
          who am i
        </span>
      </section>

      {/* Stack & Skills Section */}
      <section
        id="skills"
        className="min-h-screen flex items-center justify-center"
      >
        <span className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight uppercase text-black/40 select-none">
          Stack &amp; Skills
        </span>
      </section>
    </div>
  );
}
