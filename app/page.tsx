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
import { gql, useQuery } from "@apollo/client";
import { UserType } from "./api/login/route";

type PeopleType = {
  name: string;
  gender: string;
};

const GET_ALL_FILMS = gql`
  query GetAllPeople {
    allPeople {
      people {
        name
        gender
      }
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_FILMS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const people: PeopleType[] = data?.allPeople?.people;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //@ts-ignore
    const { username, password } = e.target.elements;

    if (!username.value || !password.value) {
      console.error("Missing input", username.value, password.value);
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error(err);
    }

    console.log("Login successful");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit}>
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
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="Józsi" required type="text" />
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
