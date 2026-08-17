import { cn } from "@/lib/utils";
import { photo, type PhotoKey } from "@/data/photos";

export function Photo({
  src,
  alt,
  className,
  imgClassName,
  ratio = "4/3",
  priority = false,
  zoom = true,
}: {
  src: PhotoKey;
  alt: string;
  className?: string;
  imgClassName?: string;
  ratio?: "4/3" | "3/2" | "1/1" | "16/9" | "3/4" | "21/9" | "none";
  priority?: boolean;
  zoom?: boolean;
}) {
  const ratioClass =
    ratio === "none"
      ? ""
      : ratio === "4/3"
        ? "aspect-[4/3]"
        : ratio === "3/2"
          ? "aspect-[3/2]"
          : ratio === "1/1"
            ? "aspect-square"
            : ratio === "16/9"
              ? "aspect-video"
              : ratio === "21/9"
                ? "aspect-[21/9]"
                : "aspect-[3/4]";

  return (
    <div className={cn("overflow-hidden bg-secondary", ratioClass, className)}>
      <img
        src={photo[src]}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        className={cn(
          "h-full w-full object-cover",
          zoom && "transition-transform duration-700 ease-out will-change-transform hover:scale-[1.04]",
          imgClassName,
        )}
      />
    </div>
  );
}
