"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Bar } from "recharts"
import {
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ScatterChart,
  Scatter,
  Area,
  ComposedChart,
  ReferenceLine,
} from "recharts"
import {
  Download,
  Eye,
  Layers,
  RefreshCw,
  Settings,
  TrendingUp,
  Zap,
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Share2,
  Camera,
  Calendar,
  Plane,
  Target,
  Crosshair,
  BarChart3,
  Clock,
} from "lucide-react"

// Sample data for health maps
const fieldZoneData = [
  { zone: "A1", x: 25, y: 30, health: 92, ndvi: 0.85, status: "Excellent", area: 2.3, lastScan: "2 hours ago" },
  { zone: "A2", x: 45, y: 25, health: 78, ndvi: 0.72, status: "Good", area: 1.8, lastScan: "4 hours ago" },
  { zone: "A3", x: 65, y: 40, health: 45, ndvi: 0.38, status: "At Risk", area: 2.1, lastScan: "1 hour ago" },
  { zone: "B1", x: 30, y: 60, health: 88, ndvi: 0.81, status: "Good", area: 2.5, lastScan: "3 hours ago" },
  { zone: "B2", x: 70, y: 70, health: 82, ndvi: 0.76, status: "Good", area: 1.9, lastScan: "5 hours ago" },
  { zone: "C1", x: 15, y: 80, health: 95, ndvi: 0.89, status: "Excellent", area: 2.0, lastScan: "1 hour ago" },
]

const vegetationIndicesData = [
  {
    index: "NDVI",
    value: 0.75,
    description: "Normalized Difference Vegetation Index",
    status: "Healthy",
    threshold: 0.7,
    trend: "stable",
  },
  {
    index: "EVI",
    value: 0.68,
    description: "Enhanced Vegetation Index",
    status: "Good",
    threshold: 0.6,
    trend: "increasing",
  },
  {
    index: "SAVI",
    value: 0.72,
    description: "Soil Adjusted Vegetation Index",
    status: "Healthy",
    threshold: 0.65,
    trend: "stable",
  },
  {
    index: "GNDVI",
    value: 0.71,
    description: "Green Normalized Difference",
    status: "Good",
    threshold: 0.65,
    trend: "decreasing",
  },
  { index: "NDRE", value: 0.69, description: "Red Edge Index", status: "Good", threshold: 0.6, trend: "stable" },
  {
    index: "CIG",
    value: 0.78,
    description: "Chlorophyll Index Green",
    status: "Excellent",
    threshold: 0.7,
    trend: "increasing",
  },
]

const spectralBandsData = [
  { wavelength: 400, reflectance: 0.05, band: "Blue" },
  { wavelength: 450, reflectance: 0.08, band: "Blue" },
  { wavelength: 500, reflectance: 0.12, band: "Green" },
  { wavelength: 550, reflectance: 0.18, band: "Green" },
  { wavelength: 600, reflectance: 0.15, band: "Red" },
  { wavelength: 650, reflectance: 0.08, band: "Red" },
  { wavelength: 700, reflectance: 0.45, band: "Red Edge" },
  { wavelength: 750, reflectance: 0.52, band: "NIR" },
  { wavelength: 800, reflectance: 0.48, band: "NIR" },
  { wavelength: 850, reflectance: 0.46, band: "NIR" },
]

const timeSeriesNDVI = [
  { date: "Week 1", ndvi: 0.65, evi: 0.58, savi: 0.62, confidence: 89 },
  { date: "Week 2", ndvi: 0.68, evi: 0.61, savi: 0.65, confidence: 92 },
  { date: "Week 3", ndvi: 0.72, evi: 0.64, savi: 0.68, confidence: 94 },
  { date: "Week 4", ndvi: 0.75, evi: 0.68, savi: 0.72, confidence: 91 },
  { date: "Week 5", ndvi: 0.73, evi: 0.66, savi: 0.7, confidence: 88 },
  { date: "Week 6", ndvi: 0.75, evi: 0.68, savi: 0.72, confidence: 93 },
]

const droneFlightData = [
  { id: 1, name: "Morning Survey", status: "completed", coverage: 85, duration: "45 min", altitude: "120m" },
  { id: 2, name: "Afternoon Scan", status: "in-progress", coverage: 32, duration: "18 min", altitude: "100m" },
  { id: 3, name: "Evening Check", status: "scheduled", coverage: 0, duration: "30 min", altitude: "150m" },
]

const historicalComparison = [
  { period: "Jan 2024", ndvi: 0.68, health: 82 },
  { period: "Feb 2024", ndvi: 0.71, health: 85 },
  { period: "Mar 2024", ndvi: 0.74, health: 88 },
  { period: "Apr 2024", ndvi: 0.76, health: 89 },
  { period: "May 2024", ndvi: 0.73, health: 86 },
  { period: "Jun 2024", ndvi: 0.75, health: 87 },
]

export default function HealthMapsPage() {
  const [selectedBand, setSelectedBand] = useState("NDVI")
  const [opacityLevel, setOpacityLevel] = useState([75])
  const [selectedZone, setSelectedZone] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState("2d")
  const [isAnimating, setIsAnimating] = useState(false)
  const [timelapseSpeed, setTimelapseSpeed] = useState([1])
  const [showGrid, setShowGrid] = useState(true)
  const [colorScheme, setColorScheme] = useState("viridis")
  const [analysisMode, setAnalysisMode] = useState("vegetation")
  const [comparisonDate, setComparisonDate] = useState("current")

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isAnimating) {
      interval = setInterval(() => {
        // Simulate real-time data updates
        console.log("[v0] Updating spectral data...")
      }, 1000 / timelapseSpeed[0])
    }
    return () => clearInterval(interval)
  }, [isAnimating, timelapseSpeed])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Interactive Health Maps</h1>
            <p className="text-muted-foreground">Advanced hyperspectral analysis and real-time vegetation monitoring</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Camera className="w-4 h-4 mr-2" />
              Capture
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Advanced Controls Panel */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Advanced Analysis Controls
          </CardTitle>
          <CardDescription>Configure hyperspectral analysis parameters and visualization settings</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="spectral" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="spectral">Spectral Analysis</TabsTrigger>
              <TabsTrigger value="visualization">Visualization</TabsTrigger>
              <TabsTrigger value="temporal">Temporal Analysis</TabsTrigger>
              <TabsTrigger value="drone">Drone Control</TabsTrigger>
            </TabsList>

            <TabsContent value="spectral" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Spectral Band</label>
                  <Select value={selectedBand} onValueChange={setSelectedBand}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NDVI">NDVI - Vegetation Health</SelectItem>
                      <SelectItem value="EVI">EVI - Enhanced Vegetation</SelectItem>
                      <SelectItem value="SAVI">SAVI - Soil Adjusted</SelectItem>
                      <SelectItem value="GNDVI">GNDVI - Green NDVI</SelectItem>
                      <SelectItem value="NDRE">NDRE - Red Edge</SelectItem>
                      <SelectItem value="CIG">CIG - Chlorophyll Index</SelectItem>
                      <SelectItem value="MCARI">MCARI - Chlorophyll Absorption</SelectItem>
                      <SelectItem value="OSAVI">OSAVI - Optimized SAVI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Analysis Mode</label>
                  <Select value={analysisMode} onValueChange={setAnalysisMode}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetation">Vegetation Analysis</SelectItem>
                      <SelectItem value="stress">Stress Detection</SelectItem>
                      <SelectItem value="disease">Disease Identification</SelectItem>
                      <SelectItem value="nutrient">Nutrient Deficiency</SelectItem>
                      <SelectItem value="water">Water Stress</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Threshold Sensitivity</label>
                  <Slider
                    value={opacityLevel}
                    onValueChange={setOpacityLevel}
                    max={100}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                  <div className="text-xs text-muted-foreground">{opacityLevel[0]}% sensitivity</div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Zone Filter</label>
                  <Input placeholder="Search zones..." className="w-full" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="visualization" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">View Mode</label>
                  <Select value={viewMode} onValueChange={setViewMode}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2d">2D Map View</SelectItem>
                      <SelectItem value="3d">3D Terrain View</SelectItem>
                      <SelectItem value="satellite">Satellite Overlay</SelectItem>
                      <SelectItem value="thermal">Thermal Imaging</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Color Scheme</label>
                  <Select value={colorScheme} onValueChange={setColorScheme}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="viridis">Viridis</SelectItem>
                      <SelectItem value="plasma">Plasma</SelectItem>
                      <SelectItem value="inferno">Inferno</SelectItem>
                      <SelectItem value="turbo">Turbo</SelectItem>
                      <SelectItem value="rainbow">Rainbow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="show-grid" checked={showGrid} onCheckedChange={setShowGrid} />
                  <label htmlFor="show-grid" className="text-sm">
                    Show Grid
                  </label>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Maximize2 className="w-4 h-4 mr-2" />
                    Fullscreen
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="temporal" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Comparison Date</label>
                  <Select value={comparisonDate} onValueChange={setComparisonDate}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current</SelectItem>
                      <SelectItem value="1week">1 Week Ago</SelectItem>
                      <SelectItem value="1month">1 Month Ago</SelectItem>
                      <SelectItem value="3months">3 Months Ago</SelectItem>
                      <SelectItem value="1year">1 Year Ago</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Animation Speed: {timelapseSpeed[0]}x</label>
                  <Slider
                    value={timelapseSpeed}
                    onValueChange={setTimelapseSpeed}
                    max={10}
                    min={0.5}
                    step={0.5}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setIsAnimating(!isAnimating)} className="flex-1">
                    {isAnimating ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {isAnimating ? "Pause" : "Play"}
                  </Button>
                  <Button variant="outline" size="sm">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Calendar className="w-4 h-4 mr-2" />
                    Timeline
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="drone" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Flight Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {droneFlightData.map((flight) => (
                      <div key={flight.id} className="flex items-center justify-between text-sm">
                        <div>
                          <p className="font-medium">{flight.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {flight.duration} • {flight.altitude}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            flight.status === "completed"
                              ? "bg-chart-3/10 text-chart-3 border-chart-3/20"
                              : flight.status === "in-progress"
                                ? "bg-primary/10 text-primary border-primary/20"
                                : "bg-muted/10 text-muted-foreground border-muted/20"
                          }`}
                        >
                          {flight.status}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <div className="space-y-2">
                  <Button className="w-full">
                    <Plane className="w-4 h-4 mr-2" />
                    Plan New Flight
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Target className="w-4 h-4 mr-2" />
                    Auto Survey
                  </Button>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full bg-transparent">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh Data
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Export Flight Data
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {/* Interactive Field Map */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-chart-3" />
                  Interactive Field Health Map
                </CardTitle>
                <CardDescription>
                  Real-time hyperspectral analysis - {selectedBand} Index ({analysisMode} mode)
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  Live
                </Badge>
                <Button variant="outline" size="sm">
                  <Crosshair className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video bg-gradient-to-br from-chart-3/5 via-primary/5 to-destructive/5 rounded-lg border overflow-hidden">
              {/* Enhanced Field Map with Interactive Zones */}
              <div className="absolute inset-0">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={showGrid ? 1 : 0} />
                    <XAxis type="number" dataKey="x" domain={[0, 100]} hide />
                    <YAxis type="number" dataKey="y" domain={[0, 100]} hide />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload[0]) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-card border rounded-lg p-4 shadow-lg min-w-48">
                              <div className="flex items-center justify-between mb-2">
                                <p className="font-medium text-lg">{data.zone}</p>
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${
                                    data.status === "Excellent"
                                      ? "bg-chart-3/10 text-chart-3 border-chart-3/20"
                                      : data.status === "Good"
                                        ? "bg-primary/10 text-primary border-primary/20"
                                        : "bg-destructive/10 text-destructive border-destructive/20"
                                  }`}
                                >
                                  {data.status}
                                </Badge>
                              </div>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Health:</span>
                                  <span className="font-medium">{data.health}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">NDVI:</span>
                                  <span className="font-medium">{data.ndvi}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Area:</span>
                                  <span className="font-medium">{data.area} ha</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Last Scan:</span>
                                  <span className="font-medium">{data.lastScan}</span>
                                </div>
                              </div>
                              <Button size="sm" className="w-full mt-3" onClick={() => setSelectedZone(data.zone)}>
                                Analyze Zone
                              </Button>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Scatter
                      dataKey="health"
                      data={fieldZoneData}
                      fill="hsl(var(--chart-3))"
                      fillOpacity={opacityLevel[0] / 100}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>

              {/* Enhanced Zone Labels with Status Indicators */}
              {fieldZoneData.map((zone) => (
                <div
                  key={zone.zone}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110 ${
                    selectedZone === zone.zone ? "ring-2 ring-primary" : ""
                  }`}
                  style={{
                    left: `${zone.x}%`,
                    top: `${zone.y}%`,
                  }}
                  onClick={() => setSelectedZone(zone.zone)}
                >
                  <div className="bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg border shadow-lg">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          zone.status === "Excellent"
                            ? "bg-chart-3"
                            : zone.status === "Good"
                              ? "bg-primary"
                              : "bg-destructive"
                        } animate-pulse`}
                      ></div>
                      <span className="text-sm font-medium">{zone.zone}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {zone.health}% • {zone.ndvi}
                    </div>
                  </div>
                </div>
              ))}

              {/* Color Scale Legend */}
              <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm p-3 rounded-lg border">
                <div className="text-xs font-medium mb-2">{selectedBand} Scale</div>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-3 bg-gradient-to-r from-destructive via-primary to-chart-3 rounded"></div>
                  <div className="text-xs text-muted-foreground">0.0 → 1.0</div>
                </div>
              </div>
            </div>

            {/* Enhanced Legend */}
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="text-center p-3 rounded-lg bg-chart-3/10 hover:bg-chart-3/20 transition-colors cursor-pointer">
                <div className="w-4 h-4 bg-chart-3 rounded mx-auto mb-2"></div>
                <p className="text-sm font-medium">Healthy (0.7-1.0)</p>
                <p className="text-xs text-muted-foreground">Optimal growth</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer">
                <div className="w-4 h-4 bg-primary rounded mx-auto mb-2"></div>
                <p className="text-sm font-medium">Moderate (0.4-0.7)</p>
                <p className="text-xs text-muted-foreground">Needs attention</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-destructive/10 hover:bg-destructive/20 transition-colors cursor-pointer">
                <div className="w-4 h-4 bg-destructive rounded mx-auto mb-2"></div>
                <p className="text-sm font-medium">At Risk (0.0-0.4)</p>
                <p className="text-xs text-muted-foreground">Immediate action</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Vegetation Indices */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-secondary" />
              Live Vegetation Indices
            </CardTitle>
            <CardDescription>Real-time spectral analysis results</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {vegetationIndicesData.map((index) => (
              <div key={index.index} className="p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">{index.index}</p>
                    <p className="text-xs text-muted-foreground">{index.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        index.status === "Excellent"
                          ? "bg-chart-3/10 text-chart-3 border-chart-3/20"
                          : index.status === "Healthy"
                            ? "bg-chart-3/10 text-chart-3 border-chart-3/20"
                            : index.status === "Good"
                              ? "bg-primary/10 text-primary border-primary/20"
                              : "bg-destructive/10 text-destructive border-destructive/20"
                      }`}
                    >
                      {index.status}
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      {index.trend === "increasing" && "↗"}
                      {index.trend === "decreasing" && "↘"}
                      {index.trend === "stable" && "→"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Progress value={index.value * 100} className="flex-1 h-2" />
                  <span className="text-sm font-medium">{index.value.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Threshold: {index.threshold}</span>
                  <span className={index.value >= index.threshold ? "text-chart-3" : "text-destructive"}>
                    {index.value >= index.threshold ? "✓ Pass" : "⚠ Below"}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Enhanced Spectral Signature */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Interactive Spectral Signature
            </CardTitle>
            <CardDescription>
              Reflectance analysis across wavelengths {selectedZone && `- Zone ${selectedZone}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={spectralBandsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="wavelength" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <ReferenceLine x={550} stroke="hsl(var(--chart-3))" strokeDasharray="5 5" />
                  <ReferenceLine x={670} stroke="hsl(var(--destructive))" strokeDasharray="5 5" />
                  <ReferenceLine x={800} stroke="hsl(var(--primary))" strokeDasharray="5 5" />
                  <Area
                    type="monotone"
                    dataKey="reflectance"
                    stroke="hsl(var(--chart-3))"
                    fill="hsl(var(--chart-3))"
                    fillOpacity={0.2}
                    name="Reflectance"
                  />
                  <Line
                    type="monotone"
                    dataKey="reflectance"
                    stroke="hsl(var(--chart-3))"
                    strokeWidth={3}
                    name="Reflectance"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2 text-xs">
              <div className="text-center p-2 bg-blue-500/10 rounded">
                <div className="font-medium">Blue</div>
                <div className="text-muted-foreground">400-500nm</div>
              </div>
              <div className="text-center p-2 bg-green-500/10 rounded">
                <div className="font-medium">Green</div>
                <div className="text-muted-foreground">500-600nm</div>
              </div>
              <div className="text-center p-2 bg-red-500/10 rounded">
                <div className="font-medium">Red</div>
                <div className="text-muted-foreground">600-700nm</div>
              </div>
              <div className="text-center p-2 bg-purple-500/10 rounded">
                <div className="font-medium">NIR</div>
                <div className="text-muted-foreground">700-900nm</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Temporal Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-chart-2" />
              Temporal Vegetation Analysis
            </CardTitle>
            <CardDescription>Historical trends with confidence intervals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={timeSeriesNDVI}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
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
                    dataKey="confidence"
                    stroke="none"
                    fill="hsl(var(--muted))"
                    fillOpacity={0.1}
                    name="Confidence (%)"
                  />
                  <Line type="monotone" dataKey="ndvi" stroke="hsl(var(--chart-3))" strokeWidth={3} name="NDVI" />
                  <Line type="monotone" dataKey="evi" stroke="hsl(var(--primary))" strokeWidth={3} name="EVI" />
                  <Line type="monotone" dataKey="savi" stroke="hsl(var(--chart-2))" strokeWidth={3} name="SAVI" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Historical Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-secondary" />
            Historical Comparison Analysis
          </CardTitle>
          <CardDescription>Compare current conditions with historical data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={historicalComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="period" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="health" fill="hsl(var(--primary))" name="Health Score" fillOpacity={0.6} />
                <Line type="monotone" dataKey="ndvi" stroke="hsl(var(--chart-3))" strokeWidth={3} name="NDVI" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
