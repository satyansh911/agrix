"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ComposedChart,
  ReferenceLine,
} from "recharts"
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bug,
  Droplets,
  Leaf,
  MapPin,
  PieChartIcon,
  Target,
  Thermometer,
  Gauge,
  TrendingUp,
  TrendingDown,
  Clock,
  Zap,
  Settings,
  Filter,
  RefreshCw,
  Maximize2,
  Eye,
  EyeOff,
} from "lucide-react"

const cropHealthData = [
  { day: "Mon", health: 85, moisture: 62, temperature: 22, yield: 4.2, pestRisk: 15 },
  { day: "Tue", health: 87, moisture: 58, temperature: 24, yield: 4.3, pestRisk: 18 },
  { day: "Wed", health: 84, moisture: 65, temperature: 23, yield: 4.1, pestRisk: 22 },
  { day: "Thu", health: 89, moisture: 61, temperature: 25, yield: 4.5, pestRisk: 12 },
  { day: "Fri", health: 91, moisture: 59, temperature: 26, yield: 4.6, pestRisk: 8 },
  { day: "Sat", health: 88, moisture: 63, temperature: 24, yield: 4.4, pestRisk: 14 },
  { day: "Sun", health: 87, moisture: 64, temperature: 24, yield: 4.3, pestRisk: 16 },
]

const realTimeMetrics = [
  { id: 1, name: "Soil pH", value: 6.8, unit: "", status: "optimal", trend: "stable" },
  { id: 2, name: "Nitrogen", value: 45, unit: "ppm", status: "low", trend: "decreasing" },
  { id: 3, name: "Phosphorus", value: 32, unit: "ppm", status: "optimal", trend: "increasing" },
  { id: 4, name: "Potassium", value: 180, unit: "ppm", status: "high", trend: "stable" },
  { id: 5, name: "Wind Speed", value: 12, unit: "km/h", status: "optimal", trend: "increasing" },
  { id: 6, name: "UV Index", value: 7.2, unit: "", status: "high", trend: "stable" },
]

const fieldDistributionData = [
  { name: "Healthy", value: 65, color: "hsl(var(--chart-3))" },
  { name: "Good", value: 25, color: "hsl(var(--primary))" },
  { name: "At Risk", value: 10, color: "hsl(var(--destructive))" },
]

const yieldPredictionData = [
  { month: "Jan", predicted: 4.2, actual: 4.1, confidence: 92 },
  { month: "Feb", predicted: 4.5, actual: 4.3, confidence: 89 },
  { month: "Mar", predicted: 4.8, actual: 4.9, confidence: 94 },
  { month: "Apr", predicted: 5.1, actual: 5.0, confidence: 91 },
  { month: "May", predicted: 5.3, actual: 5.2, confidence: 88 },
  { month: "Jun", predicted: 5.6, actual: 5.4, confidence: 85 },
]

const pestRiskData = [
  { zone: "Zone A1", risk: 15, threshold: 30, action: "Monitor" },
  { zone: "Zone A2", risk: 35, threshold: 30, action: "Inspect" },
  { zone: "Zone A3", risk: 85, threshold: 30, action: "Treat" },
  { zone: "Zone B1", risk: 25, threshold: 30, action: "Monitor" },
  { zone: "Zone B2", risk: 45, threshold: 30, action: "Inspect" },
]

const alertsData = [
  {
    id: 1,
    type: "critical",
    title: "High Pest Risk - Zone A3",
    message: "Aphid population exceeds threshold. Immediate action required.",
    time: "2 min ago",
    acknowledged: false,
  },
  {
    id: 2,
    type: "warning",
    title: "Low Soil Moisture - Zone B2",
    message: "Soil moisture below optimal range. Consider irrigation.",
    time: "15 min ago",
    acknowledged: false,
  },
  {
    id: 3,
    type: "info",
    title: "Weather Update",
    message: "Rain expected in next 24 hours. Adjust irrigation schedule.",
    time: "1 hour ago",
    acknowledged: true,
  },
]

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("7d")
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [selectedMetrics, setSelectedMetrics] = useState(["health", "moisture", "temperature"])
  const [dashboardLayout, setDashboardLayout] = useState("default")
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [alerts, setAlerts] = useState(alertsData)

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastUpdate(new Date())
      }, 30000) // Update every 30 seconds
      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  const acknowledgeAlert = (alertId: number) => {
    setAlerts(alerts.map((alert) => (alert.id === alertId ? { ...alert, acknowledged: true } : alert)))
  }

  const dismissAlert = (alertId: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== alertId))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Advanced Dashboard</h1>
            <p className="text-muted-foreground">Real-time agricultural monitoring and analytics</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              Last updated: {lastUpdate.toLocaleTimeString()}
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} id="auto-refresh" />
              <label htmlFor="auto-refresh" className="text-sm">
                Auto-refresh
              </label>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1d">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Customize
            </Button>
          </div>
        </div>
      </div>

      {alerts.filter((alert) => !alert.acknowledged).length > 0 && (
        <div className="mb-8 space-y-4">
          {alerts
            .filter((alert) => !alert.acknowledged)
            .map((alert) => (
              <Alert
                key={alert.id}
                className={`${
                  alert.type === "critical"
                    ? "border-destructive/20 bg-destructive/5"
                    : alert.type === "warning"
                      ? "border-primary/20 bg-primary/5"
                      : "border-chart-3/20 bg-chart-3/5"
                }`}
              >
                <AlertTriangle
                  className={`h-4 w-4 ${
                    alert.type === "critical"
                      ? "text-destructive"
                      : alert.type === "warning"
                        ? "text-primary"
                        : "text-chart-3"
                  }`}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <AlertTitle
                      className={`${
                        alert.type === "critical"
                          ? "text-destructive"
                          : alert.type === "warning"
                            ? "text-primary"
                            : "text-chart-3"
                      }`}
                    >
                      {alert.title}
                    </AlertTitle>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => acknowledgeAlert(alert.id)}>
                        <Eye className="w-4 h-4 mr-1" />
                        Acknowledge
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => dismissAlert(alert.id)}>
                        <EyeOff className="w-4 h-4 mr-1" />
                        Dismiss
                      </Button>
                    </div>
                  </div>
                  <AlertDescription className="mt-1">
                    {alert.message}
                    <span className="text-xs text-muted-foreground ml-2">• {alert.time}</span>
                  </AlertDescription>
                </div>
              </Alert>
            ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-chart-3/5 to-chart-3/10 border-chart-3/20 hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Crop Health</CardTitle>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-chart-3 rounded-full animate-pulse"></div>
              <Leaf className="h-4 w-4 text-chart-3" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">87%</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 text-chart-3" />
              <span>+2.3% from last week</span>
            </div>
            <Progress value={87} className="mt-2 h-2" />
            <div className="mt-3 h-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cropHealthData.slice(-4)}>
                  <Line type="monotone" dataKey="health" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-chart-2/5 to-chart-2/10 border-chart-2/20 hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Soil Moisture</CardTitle>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-chart-2 rounded-full animate-pulse"></div>
              <Droplets className="h-4 w-4 text-chart-2" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">64%</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Optimal range: 60-70%</span>
            </div>
            <Progress value={64} className="mt-2 h-2" />
            <div className="mt-3 h-8">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cropHealthData.slice(-4)}>
                  <Area
                    type="monotone"
                    dataKey="moisture"
                    stroke="hsl(var(--chart-2))"
                    fill="hsl(var(--chart-2))"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <Thermometer className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">24°C</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Ideal growing conditions</span>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">Range: 18°C - 28°C</div>
            <div className="mt-3 h-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cropHealthData.slice(-4)}>
                  <Line
                    type="monotone"
                    dataKey="temperature"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-destructive/5 to-destructive/10 border-destructive/20 hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pest Risk Level</CardTitle>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
              <Bug className="h-4 w-4 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">High</div>
            <div className="flex items-center gap-2 text-xs text-foreground/70">
              <TrendingUp className="w-3 h-3 text-destructive" />
              <span>3 zones require attention</span>
            </div>
            <Badge variant="destructive" className="mt-2 text-xs bg-destructive text-destructive-foreground">
              Action Required
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Real-Time Environmental Metrics
          </CardTitle>
          <CardDescription>Live sensor readings updated every 30 seconds</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {realTimeMetrics.map((metric) => (
              <div key={metric.id} className="p-3 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{metric.name}</span>
                  <div className="flex items-center gap-1">
                    {metric.trend === "increasing" && <TrendingUp className="w-3 h-3 text-chart-3" />}
                    {metric.trend === "decreasing" && <TrendingDown className="w-3 h-3 text-destructive" />}
                    {metric.trend === "stable" && <div className="w-3 h-0.5 bg-muted-foreground rounded"></div>}
                  </div>
                </div>
                <div className="text-lg font-bold">
                  {metric.value} {metric.unit}
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs mt-1 ${
                    metric.status === "optimal"
                      ? "bg-chart-3/10 text-chart-3 border-chart-3/20"
                      : metric.status === "high"
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "bg-destructive/10 text-destructive border-destructive/20"
                  }`}
                >
                  {metric.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="trends" className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Performance Trends</TabsTrigger>
          <TabsTrigger value="distribution">Field Distribution</TabsTrigger>
          <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
          <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      Multi-Parameter Analysis
                    </CardTitle>
                    <CardDescription>Interactive trend analysis with customizable metrics</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Maximize2 className="w-4 h-4 mr-2" />
                    Expand
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={cropHealthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <ReferenceLine y={80} stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" />
                      {selectedMetrics.includes("health") && (
                        <Line
                          type="monotone"
                          dataKey="health"
                          stroke="hsl(var(--chart-3))"
                          strokeWidth={3}
                          name="Crop Health (%)"
                        />
                      )}
                      {selectedMetrics.includes("moisture") && (
                        <Line
                          type="monotone"
                          dataKey="moisture"
                          stroke="hsl(var(--chart-2))"
                          strokeWidth={3}
                          name="Soil Moisture (%)"
                        />
                      )}
                      {selectedMetrics.includes("temperature") && (
                        <Line
                          type="monotone"
                          dataKey="temperature"
                          stroke="hsl(var(--primary))"
                          strokeWidth={3}
                          name="Temperature (°C)"
                        />
                      )}
                      <Bar dataKey="pestRisk" fill="hsl(var(--destructive))" fillOpacity={0.3} name="Pest Risk (%)" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-secondary" />
                  Chart Controls
                </CardTitle>
                <CardDescription>Customize your view</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Display Metrics</label>
                  <div className="space-y-2">
                    {[
                      { key: "health", label: "Crop Health", color: "chart-3" },
                      { key: "moisture", label: "Soil Moisture", color: "chart-2" },
                      { key: "temperature", label: "Temperature", color: "primary" },
                      { key: "yield", label: "Yield Estimate", color: "secondary" },
                    ].map((metric) => (
                      <div key={metric.key} className="flex items-center space-x-2">
                        <Switch
                          id={metric.key}
                          checked={selectedMetrics.includes(metric.key)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedMetrics([...selectedMetrics, metric.key])
                            } else {
                              setSelectedMetrics(selectedMetrics.filter((m) => m !== metric.key))
                            }
                          }}
                        />
                        <div className={`w-3 h-3 rounded bg-${metric.color}`}></div>
                        <label htmlFor={metric.key} className="text-sm">
                          {metric.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <Button className="w-full bg-transparent" variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="distribution">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChartIcon className="w-5 h-5 text-secondary" />
                Field Health Distribution
              </CardTitle>
              <CardDescription>Current status across all monitored areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={fieldDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {fieldDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {fieldDistributionData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-chart-3" />
                Yield Prediction vs Actual
              </CardTitle>
              <CardDescription>AI model accuracy and yield forecasting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yieldPredictionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="predicted" fill="hsl(var(--primary))" name="Predicted (tons/ha)" />
                    <Bar dataKey="actual" fill="hsl(var(--chart-3))" name="Actual (tons/ha)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-destructive" />
                Pest Risk Analysis by Zone
              </CardTitle>
              <CardDescription>Current risk levels across all field zones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pestRiskData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                    <YAxis dataKey="zone" type="category" stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="risk" fill="hsl(var(--destructive))" name="Risk Level (%)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Field Status Overview and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Field Status Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Field Status Overview
            </CardTitle>
            <CardDescription>Real-time status of all monitored field zones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { zone: "Zone A1", health: 92, status: "Excellent", color: "chart-3", trend: "+3%" },
              { zone: "Zone A2", health: 78, status: "Good", color: "primary", trend: "+1%" },
              { zone: "Zone A3", health: 45, status: "At Risk", color: "destructive", trend: "-8%" },
              { zone: "Zone B1", health: 88, status: "Good", color: "chart-3", trend: "+2%" },
            ].map((field) => (
              <div key={field.zone} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full bg-${field.color}`}></div>
                  <div>
                    <p className="font-medium">{field.zone}</p>
                    <p className="text-sm text-muted-foreground">{field.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <p className="font-bold">{field.health}%</p>
                    <Badge
                      variant="outline"
                      className={`text-xs ${field.trend.startsWith("+") ? "text-chart-3" : "text-destructive"}`}
                    >
                      {field.trend}
                    </Badge>
                  </div>
                  <Progress value={field.health} className="w-20 h-2 mt-1" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-secondary" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest system updates and detections</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { time: "2 min ago", event: "Hyperspectral scan completed for Zone A3", type: "info" },
              { time: "15 min ago", event: "Pest risk threshold exceeded in Zone A3", type: "warning" },
              { time: "1 hour ago", event: "Soil moisture levels updated across all zones", type: "info" },
              { time: "3 hours ago", event: "Weather data synchronized successfully", type: "success" },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20">
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === "warning"
                      ? "bg-destructive"
                      : activity.type === "success"
                        ? "bg-chart-3"
                        : "bg-secondary"
                  }`}
                ></div>
                <div className="flex-1">
                  <p className="text-sm">{activity.event}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
