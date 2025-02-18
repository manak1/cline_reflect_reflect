import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { KptBoard } from "./features/kpt/KptBoard";
import { AuthForm } from "./components/auth/AuthForm";
import { useAuth } from "./hooks/useAuth";
import { Button } from "./components/ui/button";

function App() {
	const { user, loading, signOut } = useAuth();

	if (loading) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<div className="text-lg">読み込み中...</div>
			</div>
		);
	}

	if (!user) {
		return <AuthForm />;
	}

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="min-h-screen bg-background">
				<div className="container mx-auto py-8 px-4 max-w-6xl">
					<div className="flex justify-between items-center mb-8">
						<h1 className="text-3xl font-bold text-foreground">
							Weekly Reflection
						</h1>
						<div className="flex items-center gap-4">
							<span className="text-sm text-gray-600">{user.email}</span>
							<Button variant="outline" size="sm" onClick={() => signOut()}>
								ログアウト
							</Button>
						</div>
					</div>

					<KptBoard />
				</div>
			</div>
		</DndProvider>
	);
}

export default App;
