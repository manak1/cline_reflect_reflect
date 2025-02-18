import { useState } from "react";
import { Button } from "../ui/button";
import { useAuth } from "../../hooks/useAuth";
import {
	AuthCard,
	AuthCardContent,
	AuthCardDescription,
	AuthCardFooter,
	AuthCardHeader,
	AuthCardTitle,
} from "../ui/auth-card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Icons } from "../icons";

export function AuthForm() {
	const [isSignUp, setIsSignUp] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const { signIn, signUp } = useAuth();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);
		setIsLoading(true);

		try {
			if (isSignUp) {
				await signUp(email, password);
			} else {
				await signIn(email, password);
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "認証エラーが発生しました");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="grid min-h-screen lg:grid-cols-2">
			<div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
				<div className="absolute inset-0 bg-primary" />
				<div className="relative z-20 flex items-center text-lg font-semibold">
					<Icons.logo className="mr-2 h-8 w-8" />
					Weekly Reflection
				</div>
				<div className="relative z-20 mt-auto">
					<blockquote className="space-y-2">
						<p className="text-xl">
							"振り返りは、経験を学びに変える魔法のような習慣です。"
						</p>
						<p className="text-sm text-muted-foreground/80">
							毎週の小さな気づきが、大きな成長につながっていきます。
						</p>
					</blockquote>
				</div>
			</div>
			<div className="flex items-center justify-center p-8">
				<div className="mx-auto w-full max-w-sm space-y-6">
					<AuthCard>
						<AuthCardHeader className="space-y-1">
							<AuthCardTitle className="text-2xl text-center">
								{isSignUp ? "アカウント作成" : "ログイン"}
							</AuthCardTitle>
							<AuthCardDescription className="text-center">
								{isSignUp
									? "メールアドレスとパスワードを入力してアカウントを作成してください"
									: "メールアドレスとパスワードを入力してログインしてください"}
							</AuthCardDescription>
						</AuthCardHeader>
						<AuthCardContent>
							<form onSubmit={handleSubmit} className="space-y-4">
								<div className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="email">メールアドレス</Label>
										<Input
											id="email"
											type="email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											placeholder="name@example.com"
											autoCapitalize="none"
											autoComplete="email"
											autoCorrect="off"
											disabled={isLoading}
											required
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="password">パスワード</Label>
										<Input
											id="password"
											type="password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											autoComplete={
												isSignUp ? "new-password" : "current-password"
											}
											disabled={isLoading}
											required
										/>
									</div>
								</div>
								{error && (
									<div className="rounded-md bg-destructive/10 p-3">
										<div className="text-sm font-medium text-destructive">
											{error}
										</div>
									</div>
								)}
								<Button disabled={isLoading} className="w-full">
									{isLoading && (
										<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
									)}
									{isSignUp ? "アカウントを作成" : "ログイン"}
								</Button>
							</form>
						</AuthCardContent>
						<AuthCardFooter>
							<Button
								variant="ghost"
								className="w-full"
								onClick={() => setIsSignUp(!isSignUp)}
							>
								{isSignUp ? "ログインする" : "アカウントを作成する"}
							</Button>
						</AuthCardFooter>
					</AuthCard>
				</div>
			</div>
		</div>
	);
}
