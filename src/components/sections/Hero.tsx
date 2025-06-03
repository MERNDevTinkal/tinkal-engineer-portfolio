
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
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3, 
      },
    },
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 25 }, // Slightly increased y for more pronounced entry
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <SectionWrapper id="home" className="!min-h-screen pt-24 md:pt-32 bg-gradient-to-br from-background via-card to-secondary/10 dark:to-secondary/20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          animate="visible" 
          className="space-y-6 text-center md:text-left"
        >
          <motion.h1
            variants={textItemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight font-headline"
          >
            Hi, I&apos;m <span className="text-primary">{AUTHOR_NAME}</span>
          </motion.h1>

          <motion.div
            variants={textItemVariants}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold h-20 md:h-12 text-accent dark:text-accent"
          >
            <Typewriter
              words={HERO_TITLES}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </motion.div>

          <motion.p
            variants={textItemVariants}
            className="text-lg text-muted-foreground max-w-xl mx-auto md:mx-0"
          >
            A passionate developer transforming ideas into powerful and engaging web experiences.
          </motion.p>

          <motion.div
            variants={textItemVariants}
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Button size="lg" asChild className="shadow-lg hover:shadow-primary/50 transition-shadow duration-300 ease-in-out transform hover:scale-105">
              <Link href={RESUME_PATH} target="_blank" download>
                <span>
                  <Download className="mr-2 h-5 w-5 inline" />
                  Download Resume
                </span>
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="shadow-lg hover:shadow-accent/50 transition-shadow duration-300 ease-in-out transform hover:scale-105">
              <Link href="#contact">
                <span>
                  Contact Me
                  <ArrowRight className="ml-2 h-5 w-5 inline" />
                </span>
              </Link>
            </Button>
          </motion.div>

          <motion.div
            variants={textItemVariants}
            className="flex items-center justify-center md:justify-start space-x-4 pt-4"
          >
            {SOCIAL_LINKS.map(({ name, Icon, href }) => (
               <motion.div
                key={name}
                whileHover={{ scale: 1.25, rotate: 5, y: -2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button variant="ghost" size="icon" asChild>
                  <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={name}>
                    <span> 
                      <Icon className="h-7 w-7 text-muted-foreground hover:text-primary transition-colors" />
                    </span>
                  </Link>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8, type: "spring", stiffness: 100 }} // Updated delay
          className="w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto" // Updated max-width for desktop
        >
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            className="rounded-xl shadow-2xl overflow-hidden aspect-[3/4] border-4 border-card hover:border-primary/30 transition-colors duration-300"
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
