"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area, Bar, ComposedChart } from "recharts"
import {
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Gauge,
  Wifi,
  Battery,
  AlertTriangle,
  Clock,
  Settings,
  Plus,
  Download,
  Upload,
  Zap,
  Activity,
} from "lucide-react"

const sensorData = [
  {
    id: "SOIL_001",
    name: "Soil Moisture Sensor A1",
    type: "Soil Moisture",
    location: "Zone A1",
    value: 64,
    unit: "%",
    status: "online",
    battery: 87,
    lastUpdate: "2 min ago",
    threshold: { min: 40, max: 80 },
    icon: Droplets,
    color: "chart-2",
  },
  {
    id: "TEMP_001",
    name: "Temperature Sensor A1",
    type: "Temperature",
    location: "Zone A1",
    value: 24.5,
    unit: "°C",
    status: "online",
    battery: 92,
    lastUpdate: "1 min ago",
    threshold: { min: 18, max: 28 },
    icon: Thermometer,
    color: "primary",
  },
  {
    id: "WIND_001",
    name: "Weather Station B1",
    type: "Wind Speed",
    location: "Zone B1",
    value: 12.3,
    unit: "km/h",
    status: "online",
    battery: 78,
    lastUpdate: "3 min ago",
    threshold: { min: 0, max: 25 },
    icon: Wind,
    color: "chart-3",
  },
  {
    id: "UV_001",
    name: "UV Index Sensor C1",
    type: "UV Index",
    location: "Zone C1",
    value: 7.2,
    unit: "",
    status: "warning",
    battery: 45,
    lastUpdate: "15 min ago",
    threshold: { min: 0, max: 10 },
    icon: Sun,
    color: "destructive",
  },
  {
    id: "PH_001",
    name: "Soil pH Sensor A2",
    type: "Soil pH",
    location: "Zone A2",
    value: 6.8,
    unit: "pH",
    status: "online",
    battery: 89,
    lastUpdate: "5 min ago",
    threshold: { min: 6.0, max: 7.5 },
    icon: Gauge,
    color: "secondary",
  },
  {
    id: "HUMID_001",
    name: "Humidity Sensor B2",
    type: "Humidity",
    location: "Zone B2",
    value: 68,
    unit: "%",
    status: "offline",
    battery: 12,
    lastUpdate: "2 hours ago",
    threshold: { min: 40, max: 80 },
    icon: Droplets,
    color: "muted",
  },
]

const historicalData = [
  { time: "00:00", soilMoisture: 62, temperature: 22, humidity: 65, windSpeed: 8 },
  { time: "04:00", soilMoisture: 64, temperature: 21, humidity: 68, windSpeed: 10 },
  { time: "08:00", soilMoisture: 61, temperature: 24, humidity: 62, windSpeed: 12 },
  { time: "12:00", soilMoisture: 58, temperature: 26, humidity: 58, windSpeed: 15 },
  { time: "16:00", soilMoisture: 60, temperature: 25, humidity: 60, windSpeed: 13 },
  { time: "20:00", soilMoisture: 63, temperature: 23, humidity: 64, windSpeed: 11 },
]

const alertsData = [
  {
    id: 1,
    sensor: "HUMID_001",
    type: "critical",
    message: "Humidity sensor offline - battery critically low",
    time: "2 hours ago",
    acknowledged: false,
  },
  {
    id: 2,
    sensor: "UV_001",
    type: "warning",
    message: "UV sensor battery below 50%",
    time: "15 min ago",
    acknowledged: false,
  },
  {
    id: 3,
    sensor: "SOIL_001",
    type: "info",
    message: "Soil moisture optimal - irrigation not needed",
    time: "1 hour ago",
    acknowledged: true,
  },
]

export default function SensorsPage() {
  const [selectedSensor, setSelectedSensor] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState("all")
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [alerts, setAlerts] = useState(alertsData)

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        console.log("[v0] Refreshing sensor data...")
      }, 30000)
      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  const filteredSensors = sensorData.filter((sensor) => {
    if (filterStatus === "all") return true
    return sensor.status === filterStatus
  })

  const getSensorStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-chart-3/10 text-chart-3 border-chart-3/20"
      case "warning":
        return "bg-primary/10 text-primary border-primary/20"
      case "offline":
        return "bg-destructive/10 text-destructive border-destructive/20"
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Environmental Sensors</h1>
            <p className="text-muted-foreground">Real-time monitoring and sensor management</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} id="auto-refresh" />
              <label htmlFor="auto-refresh" className="text-sm">
                Auto-refresh
              </label>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sensors</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Sensor
            </Button>
          </div>
        </div>
      </div>

      {/* Sensor Alerts */}
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
                  <AlertTitle>Sensor Alert - {alert.sensor}</AlertTitle>
                  <AlertDescription>
                    {alert.message}
                    <span className="text-xs text-muted-foreground ml-2">• {alert.time}</span>
                  </AlertDescription>
                </div>
              </Alert>
            ))}
        </div>
      )}

      {/* Sensor Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredSensors.map((sensor) => {
          const Icon = sensor.icon
          const isInRange = sensor.value >= sensor.threshold.min && sensor.value <= sensor.threshold.max

          return (
            <Card
              key={sensor.id}
              className={`hover:shadow-lg transition-shadow cursor-pointer ${
                selectedSensor === sensor.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedSensor(sensor.id)}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-2">
                  <Icon className={`h-5 w-5 text-${sensor.color}`} />
                  <div>
                    <CardTitle className="text-sm font-medium">{sensor.type}</CardTitle>
                    <CardDescription className="text-xs">{sensor.location}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`text-xs ${getSensorStatusColor(sensor.status)}`}>
                    {sensor.status}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Battery className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs">{sensor.battery}%</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">
                  {sensor.value} {sensor.unit}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>
                    Range: {sensor.threshold.min}-{sensor.threshold.max} {sensor.unit}
                  </span>
                  <span className={isInRange ? "text-chart-3" : "text-destructive"}>
                    {isInRange ? "✓ Normal" : "⚠ Alert"}
                  </span>
                </div>
                <Progress value={(sensor.value / (sensor.threshold.max * 1.2)) * 100} className="h-2 mb-2" />
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{sensor.lastUpdate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wifi className={`w-3 h-3 ${sensor.status === "online" ? "text-chart-3" : "text-destructive"}`} />
                    <span>{sensor.status === "online" ? "Connected" : "Disconnected"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs defaultValue="trends" className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Historical Trends</TabsTrigger>
          <TabsTrigger value="realtime">Real-time Data</TabsTrigger>
          <TabsTrigger value="calibration">Calibration</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                24-Hour Sensor Trends
              </CardTitle>
              <CardDescription>Historical data from all environmental sensors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="soilMoisture"
                      stroke="hsl(var(--chart-2))"
                      fill="hsl(var(--chart-2))"
                      fillOpacity={0.2}
                      name="Soil Moisture (%)"
                    />
                    <Line
                      type="monotone"
                      dataKey="temperature"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      name="Temperature (°C)"
                    />
                    <Line
                      type="monotone"
                      dataKey="humidity"
                      stroke="hsl(var(--chart-3))"
                      strokeWidth={2}
                      name="Humidity (%)"
                    />
                    <Bar dataKey="windSpeed" fill="hsl(var(--secondary))" fillOpacity={0.6} name="Wind Speed (km/h)" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="realtime">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-chart-3" />
                  Live Data Stream
                </CardTitle>
                <CardDescription>Real-time sensor readings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {sensorData
                  .filter((s) => s.status === "online")
                  .map((sensor) => (
                    <div key={sensor.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                      <div className="flex items-center gap-3">
                        <sensor.icon className={`w-5 h-5 text-${sensor.color}`} />
                        <div>
                          <p className="font-medium">{sensor.type}</p>
                          <p className="text-sm text-muted-foreground">{sensor.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">
                          {sensor.value} {sensor.unit}
                        </p>
                        <p className="text-xs text-muted-foreground">{sensor.lastUpdate}</p>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-secondary" />
                  Sensor Network Status
                </CardTitle>
                <CardDescription>Network health and connectivity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Total Sensors</span>
                    <Badge variant="outline">{sensorData.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Online</span>
                    <Badge variant="outline" className="bg-chart-3/10 text-chart-3 border-chart-3/20">
                      {sensorData.filter((s) => s.status === "online").length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Warning</span>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {sensorData.filter((s) => s.status === "warning").length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Offline</span>
                    <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                      {sensorData.filter((s) => s.status === "offline").length}
                    </Badge>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Network Health</span>
                      <span className="text-sm font-medium">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calibration">
          <Card>
            <CardHeader>
              <CardTitle>Sensor Calibration</CardTitle>
              <CardDescription>Calibrate and configure sensor parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Sensor</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose sensor to calibrate" />
                      </SelectTrigger>
                      <SelectContent>
                        {sensorData.map((sensor) => (
                          <SelectItem key={sensor.id} value={sensor.id}>
                            {sensor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Calibration Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select calibration method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zero">Zero Point Calibration</SelectItem>
                        <SelectItem value="span">Span Calibration</SelectItem>
                        <SelectItem value="multipoint">Multi-point Calibration</SelectItem>
                        <SelectItem value="factory">Factory Reset</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button>Start Calibration</Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Settings
                  </Button>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Import Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Schedule</CardTitle>
              <CardDescription>Sensor maintenance and battery status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sensorData.map((sensor) => (
                  <div key={sensor.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <sensor.icon className={`w-5 h-5 text-${sensor.color}`} />
                      <div>
                        <p className="font-medium">{sensor.name}</p>
                        <p className="text-sm text-muted-foreground">{sensor.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm">Battery: {sensor.battery}%</p>
                        <Progress value={sensor.battery} className="w-20 h-2 mt-1" />
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          sensor.battery > 70
                            ? "bg-chart-3/10 text-chart-3 border-chart-3/20"
                            : sensor.battery > 30
                              ? "bg-primary/10 text-primary border-primary/20"
                              : "bg-destructive/10 text-destructive border-destructive/20"
                        }
                      >
                        {sensor.battery > 70 ? "Good" : sensor.battery > 30 ? "Replace Soon" : "Critical"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
