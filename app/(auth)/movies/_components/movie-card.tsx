import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FilmType } from "../page";
import Link from "next/link";

type Props = React.ComponentProps<typeof Card> & FilmType;

export function MovieCard({
  className,
  title,
  director,
  releaseDate,
  producers,
  id,
}: Props) {
  return (
    <Card className={cn("max-w-[800px] w-[800px] mb-5", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <span className="text-sm font-medium leading-none">
            Directed by:{" "}
          </span>
          {director}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-2 rounded-md border px-4 py-3">
          <div className="flex-1 space-y-1">
            <span className="text-sm font-medium leading-none">
              Produced by:{" "}
            </span>
            <span className="text-sm text-muted-foreground">
              {producers.map((producer, idx) => {
                if (producers.length > idx + 1) {
                  return `${producer}, `;
                }
                return producer;
              })}
            </span>
            <br />
            <span className="text-sm font-medium leading-none">
              Released in:{" "}
            </span>
            <span className="text-sm text-muted-foreground">{releaseDate}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link className="w-full" href={`movies/${id}`}>
          <Button className="w-full">Check Movie Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
