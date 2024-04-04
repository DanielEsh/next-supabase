import type {ReactNode} from "react";

export default function LoginLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-red-500">
                <div>Auth layout</div>
                <div>
                    {children}
                </div>
            </body>
        </html>
    )
}