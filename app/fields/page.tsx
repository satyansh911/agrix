"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
} from "recharts"
import {
  MapPin,
  Leaf,
  Calendar,
  Plus,
  Edit,
  Eye,
  Download,
  Settings,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"

const fieldsData = [
  {
    id: "FIELD_001",
    name: "North Field Alpha",
    area: 12.5,
    crop: "Wheat",
    plantingDate: "2024-03-15",
    expectedHarvest: "2024-08-20",
    health: 92,
    zones: 6,
    status: "Excellent",
    coordinates: { lat: 40.7128, lng: -74.006 },
    soilType: "Loamy",
    irrigationSystem: "Drip",
    lastInspection: "2 days ago",
  },
  {
    id: "FIELD_002",
    name: "South Field Beta",
    area: 8.3,
    crop: "Corn",
    plantingDate: "2024-04-01",
    expectedHarvest: "2024-09-15",
    health: 78,
    zones: 4,
    status: "Good",
    coordinates: { lat: 40.7589, lng: -73.9851 },
    soilType: "Clay",
    irrigationSystem: "Sprinkler",
    lastInspection: "1 day ago",
  },
  {
    id: "FIELD_003",
    name: "East Field Gamma",
    area: 15.2,
    crop: "Soybeans",
    plantingDate: "2024-05-10",
    expectedHarvest: "2024-10-05",
    health: 45,
    zones: 8,
    status: "At Risk",
    coordinates: { lat: 40.6892, lng: -74.0445 },
    soilType: "Sandy",
    irrigationSystem: "Center Pivot",
    lastInspection: "5 hours ago",
  },
  {
    id: "FIELD_004",
    name: "West Field Delta",
    area: 6.7,
    crop: "Barley",
    plantingDate: "2024-03-20",
    expectedHarvest: "2024-07-30",
    health: 88,
    zones: 3,
    status: "Good",
    coordinates: { lat: 40.7505, lng: -73.9934 },
    soilType: "Silty",
    irrigationSystem: "Drip",
    lastInspection: "3 days ago",
  },
]

const cropDistributionData = [
  { crop: "Wheat", area: 12.5, percentage: 29.4, color: "hsl(var(--chart-3))" },
  { crop: "Soybeans", area: 15.2, percentage: 35.7, color: "hsl(var(--primary))" },
  { crop: "Corn", area: 8.3, percentage: 19.5, color: "hsl(var(--chart-2))" },
  { crop: "Barley", area: 6.7, percentage: 15.7, color: "hsl(var(--secondary))" },
]

const fieldPerformanceData = [
  { month: "Jan", northField: 85, southField: 82, eastField: 78, westField: 88 },
  { month: "Feb", northField: 87, southField: 84, eastField: 75, westField: 89 },
  { month: "Mar", northField: 89, southField: 86, eastField: 72, westField: 91 },
  { month: "Apr", northField: 91, southField: 88, eastField: 68, westField: 90 },
  { month: "May", northField: 92, southField: 78, eastField: 45, westField: 88 },
  { month: "Jun", northField: 92, southField: 78, eastField: 45, westField: 88 },
]

export default function FieldsPage() {
  const [selectedField, setSelectedField] = useState<string | null>(null)
  const [showAddField, setShowAddField] = useState(false)
  const [filterCrop, setFilterCrop] = useState("all")

  const filteredFields = fieldsData.filter((field) => {
    if (filterCrop === "all") return true
    return field.crop.toLowerCase() === filterCrop.toLowerCase()
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Excellent":
        return "bg-chart-3/10 text-chart-3 border-chart-3/20"
      case "Good":
        return "bg-primary/10 text-primary border-primary/20"
      case "At Risk":
        return "bg-destructive/10 text-destructive border-destructive/20"
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Excellent":
        return <CheckCircle className="w-4 h-4 text-chart-3" />
      case "Good":
        return <Activity className="w-4 h-4 text-primary" />
      case "At Risk":
        return <AlertTriangle className="w-4 h-4 text-destructive" />
      default:
        return <Activity className="w-4 h-4 text-muted-foreground" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Field Management</h1>
            <p className="text-muted-foreground">Monitor and manage your agricultural fields</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={filterCrop} onValueChange={setFilterCrop}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Crops</SelectItem>
                <SelectItem value="wheat">Wheat</SelectItem>
                <SelectItem value="corn">Corn</SelectItem>
                <SelectItem value="soybeans">Soybeans</SelectItem>
                <SelectItem value="barley">Barley</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => setShowAddField(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Field
            </Button>
          </div>
        </div>
      </div>

      {/* Field Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-chart-3/5 to-chart-3/10 border-chart-3/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fields</CardTitle>
            <MapPin className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">{fieldsData.length}</div>
            <p className="text-xs text-muted-foreground">Active fields</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Area</CardTitle>
            <Leaf className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {fieldsData.reduce((sum, field) => sum + field.area, 0).toFixed(1)} ha
            </div>
            <p className="text-xs text-muted-foreground">Under cultivation</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-chart-2/5 to-chart-2/10 border-chart-2/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Health</CardTitle>
            <Activity className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">
              {Math.round(fieldsData.reduce((sum, field) => sum + field.health, 0) / fieldsData.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Across all fields</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crop Varieties</CardTitle>
            <Leaf className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{new Set(fieldsData.map((f) => f.crop)).size}</div>
            <p className="text-xs text-muted-foreground">Different crops</p>
          </CardContent>
        </Card>
      </div>

      {/* Fields List */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Field Overview
          </CardTitle>
          <CardDescription>Detailed information about all your fields</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredFields.map((field) => (
              <div
                key={field.id}
                className={`p-4 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors cursor-pointer ${
                  selectedField === field.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedField(field.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(field.status)}
                    <div>
                      <h3 className="font-semibold text-lg">{field.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {field.area} ha • {field.crop} • {field.zones} zones
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={`${getStatusColor(field.status)}`}>
                      {field.status}
                    </Badge>
                    <div className="text-right">
                      <p className="text-lg font-bold">{field.health}%</p>
                      <p className="text-xs text-muted-foreground">Health Score</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Planting Date</p>
                    <p className="font-medium">{new Date(field.plantingDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Expected Harvest</p>
                    <p className="font-medium">{new Date(field.expectedHarvest).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Soil Type</p>
                    <p className="font-medium">{field.soilType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Irrigation</p>
                    <p className="font-medium">{field.irrigationSystem}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Progress value={field.health} className="w-32 h-2" />
                    <span className="text-sm text-muted-foreground">Last inspection: {field.lastInspection}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="analytics" className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analytics">Field Analytics</TabsTrigger>
          <TabsTrigger value="distribution">Crop Distribution</TabsTrigger>
          <TabsTrigger value="planning">Crop Planning</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-chart-3" />
                Field Performance Trends
              </CardTitle>
              <CardDescription>Health score evolution across all fields</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={fieldPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" domain={[40, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="northField"
                      stroke="hsl(var(--chart-3))"
                      strokeWidth={3}
                      name="North Field Alpha"
                    />
                    <Line
                      type="monotone"
                      dataKey="southField"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      name="South Field Beta"
                    />
                    <Line
                      type="monotone"
                      dataKey="eastField"
                      stroke="hsl(var(--destructive))"
                      strokeWidth={3}
                      name="East Field Gamma"
                    />
                    <Line
                      type="monotone"
                      dataKey="westField"
                      stroke="hsl(var(--secondary))"
                      strokeWidth={3}
                      name="West Field Delta"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-secondary" />
                  Crop Distribution by Area
                </CardTitle>
                <CardDescription>Land allocation across different crops</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={cropDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="area"
                      >
                        {cropDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {cropDistributionData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span>{item.crop}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.area} ha</span>
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
                  <Calendar className="w-5 h-5 text-chart-2" />
                  Harvest Schedule
                </CardTitle>
                <CardDescription>Upcoming harvest dates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {fieldsData
                  .sort((a, b) => new Date(a.expectedHarvest).getTime() - new Date(b.expectedHarvest).getTime())
                  .map((field) => (
                    <div key={field.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                      <div>
                        <p className="font-medium">{field.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {field.crop} • {field.area} ha
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{new Date(field.expectedHarvest).toLocaleDateString()}</p>
                        <p className="text-xs text-muted-foreground">
                          {Math.ceil(
                            (new Date(field.expectedHarvest).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                          )}{" "}
                          days
                        </p>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="planning">
          <Card>
            <CardHeader>
              <CardTitle>Crop Planning & Rotation</CardTitle>
              <CardDescription>Plan future crops and rotation schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Next Season Planning</h3>
                    <div className="space-y-2">
                      <Label htmlFor="field-select">Select Field</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose field for planning" />
                        </SelectTrigger>
                        <SelectContent>
                          {fieldsData.map((field) => (
                            <SelectItem key={field.id} value={field.id}>
                              {field.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="crop-select">Planned Crop</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select crop for next season" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wheat">Wheat</SelectItem>
                          <SelectItem value="corn">Corn</SelectItem>
                          <SelectItem value="soybeans">Soybeans</SelectItem>
                          <SelectItem value="barley">Barley</SelectItem>
                          <SelectItem value="oats">Oats</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="planting-date">Planned Planting Date</Label>
                      <Input type="date" id="planting-date" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold">Rotation Recommendations</h3>
                    <div className="space-y-3">
                      {[
                        {
                          field: "North Field Alpha",
                          current: "Wheat",
                          recommended: "Soybeans",
                          reason: "Nitrogen fixation",
                        },
                        { field: "South Field Beta", current: "Corn", recommended: "Wheat", reason: "Pest management" },
                        { field: "East Field Gamma", current: "Soybeans", recommended: "Corn", reason: "Soil health" },
                      ].map((rec, index) => (
                        <div key={index} className="p-3 rounded-lg border bg-card/50">
                          <p className="font-medium text-sm">{rec.field}</p>
                          <p className="text-xs text-muted-foreground">
                            {rec.current} → {rec.recommended}
                          </p>
                          <p className="text-xs text-chart-3 mt-1">{rec.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button>Save Planning</Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Plan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Field Reports</CardTitle>
              <CardDescription>Generate and download field performance reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Report Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="health">Health Summary</SelectItem>
                        <SelectItem value="yield">Yield Analysis</SelectItem>
                        <SelectItem value="financial">Financial Report</SelectItem>
                        <SelectItem value="comprehensive">Comprehensive Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Time Period</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current">Current Season</SelectItem>
                        <SelectItem value="last30">Last 30 Days</SelectItem>
                        <SelectItem value="last90">Last 90 Days</SelectItem>
                        <SelectItem value="yearly">Yearly Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Fields</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select fields" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Fields</SelectItem>
                        {fieldsData.map((field) => (
                          <SelectItem key={field.id} value={field.id}>
                            {field.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button>
                    <Download className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Schedule Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Field Modal would go here */}
      {showAddField && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Add New Field</CardTitle>
              <CardDescription>Create a new field for monitoring</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="field-name">Field Name</Label>
                  <Input id="field-name" placeholder="Enter field name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="field-area">Area (hectares)</Label>
                  <Input id="field-area" type="number" placeholder="0.0" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="crop-type">Crop Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select crop" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wheat">Wheat</SelectItem>
                      <SelectItem value="corn">Corn</SelectItem>
                      <SelectItem value="soybeans">Soybeans</SelectItem>
                      <SelectItem value="barley">Barley</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="soil-type">Soil Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="loamy">Loamy</SelectItem>
                      <SelectItem value="clay">Clay</SelectItem>
                      <SelectItem value="sandy">Sandy</SelectItem>
                      <SelectItem value="silty">Silty</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="field-notes">Notes</Label>
                <Textarea id="field-notes" placeholder="Additional field information..." />
              </div>
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setShowAddField(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowAddField(false)}>Add Field</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
