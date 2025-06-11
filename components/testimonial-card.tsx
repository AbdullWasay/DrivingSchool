"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

export default function TestimonialCard({ testimonial }) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center mb-4">
          <div className="mr-4 rounded-full overflow-hidden w-12 h-12 flex-shrink-0">
            <Image
              src={
                testimonial.avatar ||
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=96&q=80"
              }
              alt={testimonial.name}
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-foreground truncate">
              {testimonial.name}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              {testimonial.role}
            </p>
          </div>
        </div>
        <div className="flex mb-4">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < testimonial.rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
        </div>
        <p className="text-muted-foreground leading-relaxed flex-1">
          {testimonial.content}
        </p>
      </CardContent>
    </Card>
  );
}
