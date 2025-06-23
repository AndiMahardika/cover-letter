import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText } from "lucide-react"

export default function AdminDashboard() {
    const stats = [
        {
            title: "Total Users",
            value: "1,234",
            description: "+12% dari bulan lalu",
            icon: Users,
            color: "text-blue-600",
        },
        {
            title: "Cover Letters Generated",
            value: "5,678",
            description: "+23% dari bulan lalu",
            icon: FileText,
            color: "text-green-600",
        },
    ]

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">Selamat datang di admin panel EasyLetter</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">{stat.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Manajemen User</CardTitle>
                    <CardDescription>Kelola semua user yang terdaftar di EasyLetter</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Gunakan menu "Manajemen User" di sidebar untuk mengelola data user secara lengkap.
                        </p>
                        <div className="flex gap-4">
                            <div className="text-center p-4 border rounded-lg">
                                <div className="text-2xl font-bold text-green-600">
                                    {/* Active users count would be calculated here */}
                                    892
                                </div>
                                <div className="text-sm text-muted-foreground">Active Users</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                                <div className="text-2xl font-bold text-yellow-600">
                                    {/* Inactive users count would be calculated here */}
                                    234
                                </div>
                                <div className="text-sm text-muted-foreground">Inactive Users</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                                <div className="text-2xl font-bold text-red-600">
                                    {/* Suspended users count would be calculated here */}
                                    108
                                </div>
                                <div className="text-sm text-muted-foreground">Suspended Users</div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
