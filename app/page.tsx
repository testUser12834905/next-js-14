"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={() => {}}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>
              Enter your email and password to login
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="test@example.com"
                  required
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  required
                  placeholder="********"
                  type="password"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex">
            <Button className="ml-auto">Login</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
