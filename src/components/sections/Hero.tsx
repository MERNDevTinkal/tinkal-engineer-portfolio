"use client";

import Image from "next/image";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { motion } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { HERO_TITLES, SOCIAL_LINKS, PROFILE_IMAGES, RESUME_PATH, AUTHOR_NAME } from "@/lib/data";

export function Hero() {
  const titleColors = [
    "text-primary",
    "text-accent",
    "text-secondary-foreground dark:text-secondary-foreground", // ensure good contrast on light/dark
  ];

  return (
    <SectionWrapper id="home" className="!min-h-screen pt-24 md:pt-32 bg-gradient-to-br from-background to-card">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 text-center md:text-left"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight font-headline">
            Hi, I&apos;m <span className="text-primary">{AUTHOR_NAME}</span>
          </h1>
          <div className="text-2xl sm:text-3xl md:text-4xl font-semibold h-20 md:h-12">
            <Typewriter
              words={HERO_TITLES}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
              onLoopDone={() => {}}
              onType={(count) => {
                const currentWordIndex = count % HERO_TITLES.length;
                const currentColorClass = titleColors[currentWordIndex % titleColors.length];
                // This is a bit tricky with Typewriter; direct color manipulation per word is hard.
                // We'll apply a consistent color to the whole typewriter component or make it subtle.
                // For now, the wrapper span will have a dynamic color if possible, or a fixed one.
              }}
            />
          </div>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto md:mx-0">
            A passionate developer transforming ideas into powerful and engaging web experiences.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" asChild className="shadow-lg hover:shadow-primary/50 transition-shadow">
              <Link href={RESUME_PATH} target="_blank" download>
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="shadow-lg hover:shadow-accent/50 transition-shadow">
              <Link href="#contact">
                Contact Me
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="flex items-center justify-center md:justify-start space-x-4 pt-4">
            {SOCIAL_LINKS.map(({ name, Icon, href }) => (
               <motion.div
                key={name}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button variant="ghost" size="icon" asChild>
                  <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={name}>
                    <Icon className="h-7 w-7 text-muted-foreground hover:text-primary transition-colors" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-md mx-auto"
        >
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            className="rounded-xl shadow-2xl overflow-hidden aspect-[3/4]"
          >
            {PROFILE_IMAGES.map((image, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={800}
                  priority={index === 0}
                  className="object-cover w-full h-full"
                  data-ai-hint={image.dataAiHint}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
