import { useState } from "react";
import { Search, Filter, Download, AlertCircle, Info, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LogEntry {
  id: string;
  timestamp: string;
  level: "info" | "warning" | "error" | "success";
  category: string;
  message: string;
  details?: string;
  userId?: string;
  tenantId?: string;
}

const mockLogs: LogEntry[] = [
  {
    id: "1",
    timestamp: "2024-01-20 15:45:32",
    level: "info",
    category: "Auth",
    message: "User login successful",
    userId: "user_abc123",
    tenantId: "tenant_coffee",
  },
  {
    id: "2",
    timestamp: "2024-01-20 15:44:18",
    level: "error",
    category: "Payment",
    message: "Payment processing failed",
    details: "Card declined - insufficient funds",
    tenantId: "tenant_tech",
  },
  {
    id: "3",
    timestamp: "2024-01-20 15:42:05",
    level: "warning",
    category: "System",
    message: "High memory usage detected",
    details: "Memory usage at 85% threshold",
  },
  {
    id: "4",
    timestamp: "2024-01-20 15:40:22",
    level: "success",
    category: "Subscription",
    message: "Subscription upgraded successfully",
    tenantId: "tenant_fresh",
  },
  {
    id: "5",
    timestamp: "2024-01-20 15:38:11",
    level: "info",
    category: "API",
    message: "API rate limit warning",
    details: "Tenant approaching rate limit (80%)",
    tenantId: "tenant_urban",
  },
  {
    id: "6",
    timestamp: "2024-01-20 15:35:44",
    level: "error",
    category: "Database",
    message: "Database connection timeout",
    details: "Connection pool exhausted, retrying...",
  },
  {
    id: "7",
    timestamp: "2024-01-20 15:33:28",
    level: "info",
    category: "Backup",
    message: "Daily backup completed",
    details: "Backup size: 2.3GB",
  },
  {
    id: "8",
    timestamp: "2024-01-20 15:30:15",
    level: "warning",
    category: "Security",
    message: "Multiple failed login attempts",
    details: "5 failed attempts from IP 192.168.1.100",
    tenantId: "tenant_quick",
  },
  {
    id: "9",
    timestamp: "2024-01-20 15:28:03",
    level: "success",
    category: "Deployment",
    message: "New version deployed successfully",
    details: "Version 2.4.1 deployed to production",
  },
  {
    id: "10",
    timestamp: "2024-01-20 15:25:47",
    level: "info",
    category: "Email",
    message: "Bulk email sent",
    details: "156 emails sent for monthly newsletter",
  },
];

const levelConfig = {
  info: { icon: Info, color: "text-blue-500", bg: "bg-blue-500/10" },
  warning: { icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  error: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-500/10" },
  success: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10" },
};

export function SystemLogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === "all" || log.level === levelFilter;
    const matchesCategory = categoryFilter === "all" || log.category === categoryFilter;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const categories = [...new Set(mockLogs.map((log) => log.category))];

  const logCounts = {
    info: mockLogs.filter((l) => l.level === "info").length,
    warning: mockLogs.filter((l) => l.level === "warning").length,
    error: mockLogs.filter((l) => l.level === "error").length,
    success: mockLogs.filter((l) => l.level === "success").length,
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-4">
        {Object.entries(logCounts).map(([level, count]) => {
          const config = levelConfig[level as keyof typeof levelConfig];
          const Icon = config.icon;
          return (
            <Card key={level} className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => setLevelFilter(level)}>
              <CardContent className="flex items-center gap-3 p-4">
                <div className={`h-10 w-10 rounded-lg ${config.bg} flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 ${config.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-xs text-muted-foreground capitalize">{level}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>Real-time system activity and events</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="success">Success</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ScrollArea className="h-[500px] rounded-lg border">
            <div className="divide-y">
              {filteredLogs.map((log) => {
                const config = levelConfig[log.level];
                const Icon = config.icon;
                return (
                  <div key={log.id} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={`h-8 w-8 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`h-4 w-4 ${config.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium">{log.message}</span>
                          <Badge variant="outline" className="text-xs">
                            {log.category}
                          </Badge>
                        </div>
                        {log.details && (
                          <p className="text-sm text-muted-foreground mt-1">{log.details}</p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>{log.timestamp}</span>
                          {log.tenantId && <span>Tenant: {log.tenantId}</span>}
                          {log.userId && <span>User: {log.userId}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
