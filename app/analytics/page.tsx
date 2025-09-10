"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  BarChart,
  Bar,
  ComposedChart,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Brain,
  TrendingUp,
  Target,
  Zap,
  BarChart3,
  PieChartIcon,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Settings,
  Cpu,
  Database,
  Network,
} from "lucide-react"

// AI Model Performance Data
const modelPerformanceData = [
  { model: "LSTM Crop Health", accuracy: 94.2, precision: 92.8, recall: 95.1, f1Score: 93.9, status: "active" },
  { model: "CNN Disease Detection", accuracy: 89.7, precision: 91.3, recall: 87.2, f1Score: 89.2, status: "active" },
  { model: "Pest Risk Predictor", accuracy: 87.5, precision: 85.9, recall: 89.1, f1Score: 87.5, status: "training" },
  { model: "Yield Forecasting", accuracy: 91.8, precision: 90.4, recall: 93.2, f1Score: 91.8, status: "active" },
  { model: "Soil Health Analyzer", accuracy: 88.3, precision: 86.7, recall: 90.1, f1Score: 88.4, status: "active" },
]

// Prediction Accuracy Over Time
const predictionAccuracyData = [
  { week: "Week 1", cropHealth: 92.1, diseaseDetection: 87.3, pestRisk: 84.2, yieldForecast: 89.7 },
  { week: "Week 2", cropHealth: 93.4, diseaseDetection: 88.9, pestRisk: 86.1, yieldForecast: 90.8 },
  { week: "Week 3", cropHealth: 94.2, diseaseDetection: 89.7, pestRisk: 87.5, yieldForecast: 91.8 },
  { week: "Week 4", cropHealth: 93.8, diseaseDetection: 90.2, pestRisk: 88.3, yieldForecast: 92.1 },
  { week: "Week 5", cropHealth: 94.5, diseaseDetection: 91.1, pestRisk: 89.0, yieldForecast: 92.5 },
  { week: "Week 6", cropHealth: 94.2, diseaseDetection: 89.7, pestRisk: 87.5, yieldForecast: 91.8 },
]

// Feature Importance Data
const featureImportanceData = [
  { feature: "NDVI", importance: 0.28, category: "Spectral" },
  { feature: "Soil Moisture", importance: 0.24, category: "Environmental" },
  { feature: "Temperature", importance: 0.18, category: "Environmental" },
  { feature: "Red Edge Index", importance: 0.15, category: "Spectral" },
  { feature: "Humidity", importance: 0.08, category: "Environmental" },
  { feature: "Wind Speed", importance: 0.04, category: "Environmental" },
  { feature: "UV Index", importance: 0.03, category: "Environmental" },
]

// Model Training Data
const trainingMetricsData = [
  { epoch: 1, loss: 0.45, valLoss: 0.52, accuracy: 78.2, valAccuracy: 75.8 },
  { epoch: 5, loss: 0.32, valLoss: 0.38, accuracy: 85.4, valAccuracy: 83.1 },
  { epoch: 10, loss: 0.24, valLoss: 0.29, accuracy: 89.7, valAccuracy: 87.3 },
  { epoch: 15, loss: 0.18, valLoss: 0.23, accuracy: 92.1, valAccuracy: 89.8 },
  { epoch: 20, loss: 0.15, valLoss: 0.21, accuracy: 93.8, valAccuracy: 91.2 },
  { epoch: 25, loss: 0.12, valLoss: 0.19, accuracy: 94.5, valAccuracy: 92.1 },
]

// Prediction Distribution
const predictionDistributionData = [
  { category: "Healthy", count: 1247, percentage: 68.2, color: "hsl(var(--chart-3))" },
  { category: "At Risk", count: 423, percentage: 23.1, color: "hsl(var(--primary))" },
  { category: "Disease Detected", count: 158, percentage: 8.7, color: "hsl(var(--destructive))" },
]

// Real-time Processing Stats
const processingStatsData = [
  { metric: "Images Processed", value: 1247, unit: "today", trend: "+12%" },
  { metric: "Predictions Made", value: 3891, unit: "today", trend: "+8%" },
  { metric: "Model Inference Time", value: 0.23, unit: "seconds", trend: "-5%" },
  { metric: "Data Points Analyzed", value: 15672, unit: "today", trend: "+15%" },
]

export default function AnalyticsPage() {
  const [selectedModel, setSelectedModel] = useState("all")
  const [timeRange, setTimeRange] = useState("7d")
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [confidenceThreshold, setConfidenceThreshold] = useState([85])
  const [showAdvanced, setShowAdvanced] = useState(false)

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        console.log("[v0] Refreshing analytics data...")
      }, 60000) // Update every minute
      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI Analytics & Insights</h1>
            <p className="text-muted-foreground">Advanced machine learning model performance and predictions</p>
          </div>
          <div className="flex items-center gap-4">
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
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* Real-time Processing Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {processingStatsData.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.metric}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    stat.trend.startsWith("+")
                      ? "text-chart-3"
                      : stat.trend.startsWith("-")
                        ? "text-destructive"
                        : "text-muted-foreground"
                  }`}
                >
                  {stat.trend}
                </Badge>
                {index === 0 && <Database className="h-4 w-4 text-primary" />}
                {index === 1 && <Brain className="h-4 w-4 text-chart-3" />}
                {index === 2 && <Cpu className="h-4 w-4 text-secondary" />}
                {index === 3 && <Network className="h-4 w-4 text-chart-2" />}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {typeof stat.value === "number" && stat.value > 1000
                  ? (stat.value / 1000).toFixed(1) + "K"
                  : stat.value}
              </div>
              <p className="text-xs text-muted-foreground">{stat.unit}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Model Performance Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            AI Model Performance Dashboard
          </CardTitle>
          <CardDescription>Real-time performance metrics for all deployed models</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {modelPerformanceData.map((model, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-card/50">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        model.status === "active"
                          ? "bg-chart-3 animate-pulse"
                          : model.status === "training"
                            ? "bg-primary animate-pulse"
                            : "bg-muted"
                      }`}
                    ></div>
                    <div>
                      <p className="font-medium">{model.model}</p>
                      <p className="text-sm text-muted-foreground capitalize">{model.status}</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-6 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Accuracy</p>
                    <p className="text-lg font-bold text-chart-3">{model.accuracy}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Precision</p>
                    <p className="text-lg font-bold text-primary">{model.precision}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Recall</p>
                    <p className="text-lg font-bold text-secondary">{model.recall}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">F1-Score</p>
                    <p className="text-lg font-bold text-chart-2">{model.f1Score}%</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="performance" className="mb-8">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-chart-3" />
                  Model Accuracy Trends
                </CardTitle>
                <CardDescription>Performance evolution over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={predictionAccuracyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" domain={[80, 100]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="cropHealth"
                        stroke="hsl(var(--chart-3))"
                        strokeWidth={3}
                        name="Crop Health Model"
                      />
                      <Line
                        type="monotone"
                        dataKey="diseaseDetection"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        name="Disease Detection"
                      />
                      <Line
                        type="monotone"
                        dataKey="pestRisk"
                        stroke="hsl(var(--destructive))"
                        strokeWidth={3}
                        name="Pest Risk Predictor"
                      />
                      <Line
                        type="monotone"
                        dataKey="yieldForecast"
                        stroke="hsl(var(--secondary))"
                        strokeWidth={3}
                        name="Yield Forecasting"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Confidence Threshold Analysis
                </CardTitle>
                <CardDescription>Adjust prediction confidence levels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-medium">Confidence Threshold</label>
                    <span className="text-sm font-bold">{confidenceThreshold[0]}%</span>
                  </div>
                  <Slider
                    value={confidenceThreshold}
                    onValueChange={setConfidenceThreshold}
                    max={100}
                    min={50}
                    step={5}
                    className="w-full"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                    <span className="text-sm">High Confidence Predictions</span>
                    <Badge variant="outline" className="bg-chart-3/10 text-chart-3 border-chart-3/20">
                      {Math.round(100 - confidenceThreshold[0] / 2)}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                    <span className="text-sm">Medium Confidence</span>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {Math.round(confidenceThreshold[0] / 3)}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                    <span className="text-sm">Low Confidence</span>
                    <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                      {Math.round(
                        100 - confidenceThreshold[0] - (100 - confidenceThreshold[0] / 2) - confidenceThreshold[0] / 3,
                      )}
                      %
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5 text-secondary" />
                  Prediction Distribution
                </CardTitle>
                <CardDescription>Current crop health predictions across all zones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={predictionDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="count"
                      >
                        {predictionDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {predictionDistributionData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span>{item.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.count}</span>
                        <span className="text-muted-foreground">({item.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-chart-2" />
                  Real-time Prediction Feed
                </CardTitle>
                <CardDescription>Latest AI model predictions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { zone: "A1", prediction: "Healthy", confidence: 94.2, time: "2 min ago", type: "success" },
                  { zone: "B3", prediction: "Disease Risk", confidence: 87.5, time: "5 min ago", type: "warning" },
                  { zone: "C2", prediction: "Pest Alert", confidence: 91.8, time: "8 min ago", type: "danger" },
                  { zone: "A4", prediction: "Optimal Growth", confidence: 96.1, time: "12 min ago", type: "success" },
                ].map((prediction, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          prediction.type === "success"
                            ? "bg-chart-3"
                            : prediction.type === "warning"
                              ? "bg-primary"
                              : "bg-destructive"
                        }`}
                      ></div>
                      <div>
                        <p className="font-medium">Zone {prediction.zone}</p>
                        <p className="text-sm text-muted-foreground">{prediction.prediction}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{prediction.confidence}%</p>
                      <p className="text-xs text-muted-foreground">{prediction.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="training">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-primary" />
                Model Training Metrics
              </CardTitle>
              <CardDescription>Training progress and validation performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={trainingMetricsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="epoch" stroke="hsl(var(--muted-foreground))" />
                    <YAxis yAxisId="loss" orientation="left" stroke="hsl(var(--muted-foreground))" />
                    <YAxis yAxisId="accuracy" orientation="right" stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      yAxisId="loss"
                      type="monotone"
                      dataKey="loss"
                      stroke="hsl(var(--destructive))"
                      fill="hsl(var(--destructive))"
                      fillOpacity={0.2}
                      name="Training Loss"
                    />
                    <Line
                      yAxisId="loss"
                      type="monotone"
                      dataKey="valLoss"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      name="Validation Loss"
                    />
                    <Line
                      yAxisId="accuracy"
                      type="monotone"
                      dataKey="accuracy"
                      stroke="hsl(var(--chart-3))"
                      strokeWidth={3}
                      name="Training Accuracy"
                    />
                    <Line
                      yAxisId="accuracy"
                      type="monotone"
                      dataKey="valAccuracy"
                      stroke="hsl(var(--secondary))"
                      strokeWidth={3}
                      name="Validation Accuracy"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-secondary" />
                Feature Importance Analysis
              </CardTitle>
              <CardDescription>Most influential features in model predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={featureImportanceData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                    <YAxis dataKey="feature" type="category" stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar
                      dataKey="importance"
                      fill="hsl(var(--primary))"
                      name="Importance Score"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Spectral Features</h4>
                  {featureImportanceData
                    .filter((f) => f.category === "Spectral")
                    .map((feature, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span>{feature.feature}</span>
                        <Badge variant="outline" className="bg-chart-3/10 text-chart-3 border-chart-3/20">
                          {(feature.importance * 100).toFixed(1)}%
                        </Badge>
                      </div>
                    ))}
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Environmental Features</h4>
                  {featureImportanceData
                    .filter((f) => f.category === "Environmental")
                    .map((feature, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span>{feature.feature}</span>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          {(feature.importance * 100).toFixed(1)}%
                        </Badge>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-chart-3" />
                  Key Insights
                </CardTitle>
                <CardDescription>AI-generated insights from data analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    insight: "NDVI values show 15% improvement in Zone A1 over the past week",
                    confidence: 94,
                    type: "positive",
                    icon: CheckCircle,
                  },
                  {
                    insight: "Disease risk model predicts 23% higher probability in Zone B3",
                    confidence: 87,
                    type: "warning",
                    icon: AlertTriangle,
                  },
                  {
                    insight: "Soil moisture correlation with crop health increased to 0.89",
                    confidence: 91,
                    type: "info",
                    icon: Activity,
                  },
                  {
                    insight: "Optimal irrigation timing identified for maximum yield potential",
                    confidence: 96,
                    type: "positive",
                    icon: CheckCircle,
                  },
                ].map((item, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-card/50">
                    <div className="flex items-start gap-3">
                      <item.icon
                        className={`w-5 h-5 mt-0.5 ${
                          item.type === "positive"
                            ? "text-chart-3"
                            : item.type === "warning"
                              ? "text-destructive"
                              : "text-primary"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm">{item.insight}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-muted-foreground">Confidence:</span>
                          <Progress value={item.confidence} className="w-20 h-2" />
                          <span className="text-xs font-medium">{item.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-secondary" />
                  Recommendations
                </CardTitle>
                <CardDescription>AI-powered actionable recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    action: "Increase irrigation frequency in Zone B2",
                    priority: "High",
                    impact: "Yield +12%",
                    timeframe: "Next 2 days",
                  },
                  {
                    action: "Apply fungicide treatment to Zone A3",
                    priority: "Critical",
                    impact: "Prevent 85% crop loss",
                    timeframe: "Immediate",
                  },
                  {
                    action: "Adjust fertilizer application in Zone C1",
                    priority: "Medium",
                    impact: "Quality +8%",
                    timeframe: "Next week",
                  },
                  {
                    action: "Schedule pest monitoring for Zone B1",
                    priority: "Low",
                    impact: "Prevention",
                    timeframe: "Next 5 days",
                  },
                ].map((rec, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-card/50">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">{rec.action}</p>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          rec.priority === "Critical"
                            ? "bg-destructive/10 text-destructive border-destructive/20"
                            : rec.priority === "High"
                              ? "bg-primary/10 text-primary border-primary/20"
                              : rec.priority === "Medium"
                                ? "bg-chart-3/10 text-chart-3 border-chart-3/20"
                                : "bg-muted/10 text-muted-foreground border-muted/20"
                        }`}
                      >
                        {rec.priority}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                      <div>
                        <span>Expected Impact:</span>
                        <p className="font-medium text-foreground">{rec.impact}</p>
                      </div>
                      <div>
                        <span>Timeframe:</span>
                        <p className="font-medium text-foreground">{rec.timeframe}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
