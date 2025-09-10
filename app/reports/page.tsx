"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts"
import {
  FileText,
  Download,
  Clock,
  Eye,
  Share2,
  Settings,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"

const reportsData = [
  {
    id: "RPT_001",
    name: "Weekly Health Summary",
    type: "Health Report",
    generated: "2024-06-15",
    status: "completed",
    size: "2.3 MB",
    format: "PDF",
    fields: ["North Field Alpha", "South Field Beta"],
    schedule: "Weekly",
  },
  {
    id: "RPT_002",
    name: "Monthly Yield Analysis",
    type: "Yield Report",
    generated: "2024-06-01",
    status: "completed",
    size: "4.7 MB",
    format: "Excel",
    fields: ["All Fields"],
    schedule: "Monthly",
  },
  {
    id: "RPT_003",
    name: "Pest Risk Assessment",
    type: "Risk Report",
    generated: "2024-06-14",
    status: "processing",
    size: "1.8 MB",
    format: "PDF",
    fields: ["East Field Gamma"],
    schedule: "On-demand",
  },
  {
    id: "RPT_004",
    name: "Comprehensive Season Report",
    type: "Comprehensive",
    generated: "2024-05-30",
    status: "completed",
    size: "12.4 MB",
    format: "PDF",
    fields: ["All Fields"],
    schedule: "Seasonal",
  },
]

const reportTemplates = [
  {
    id: "TMPL_001",
    name: "Daily Health Check",
    description: "Quick daily overview of field health metrics",
    sections: ["Health Scores", "Alerts", "Weather Impact"],
    estimatedTime: "2 min",
  },
  {
    id: "TMPL_002",
    name: "Weekly Performance",
    description: "Comprehensive weekly analysis with trends",
    sections: ["Performance Trends", "Sensor Data", "Recommendations"],
    estimatedTime: "5 min",
  },
  {
    id: "TMPL_003",
    name: "Monthly Financial",
    description: "Financial analysis with cost and yield projections",
    sections: ["Cost Analysis", "Yield Projections", "ROI Metrics"],
    estimatedTime: "8 min",
  },
  {
    id: "TMPL_004",
    name: "Seasonal Summary",
    description: "Complete seasonal overview with historical comparisons",
    sections: ["Season Overview", "Historical Comparison", "Future Planning"],
    estimatedTime: "15 min",
  },
]

const performanceMetrics = [
  { metric: "Crop Health", current: 87, target: 90, trend: "+2.3%" },
  { metric: "Yield Efficiency", current: 94, target: 95, trend: "+1.8%" },
  { metric: "Resource Usage", current: 78, target: 85, trend: "-3.2%" },
  { metric: "Cost Efficiency", current: 82, target: 80, trend: "+5.1%" },
]

const trendData = [
  { month: "Jan", health: 82, yield: 78, efficiency: 75 },
  { month: "Feb", health: 84, yield: 81, efficiency: 77 },
  { month: "Mar", health: 86, yield: 85, efficiency: 79 },
  { month: "Apr", health: 85, yield: 88, efficiency: 81 },
  { month: "May", health: 87, yield: 91, efficiency: 78 },
  { month: "Jun", health: 87, yield: 94, efficiency: 78 },
]

export default function ReportsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [reportFormat, setReportFormat] = useState("pdf")
  const [includeCharts, setIncludeCharts] = useState(true)
  const [includeRawData, setIncludeRawData] = useState(false)
  const [selectedFields, setSelectedFields] = useState<string[]>([])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-chart-3/10 text-chart-3 border-chart-3/20"
      case "processing":
        return "bg-primary/10 text-primary border-primary/20"
      case "failed":
        return "bg-destructive/10 text-destructive border-destructive/20"
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-chart-3" />
      case "processing":
        return <Clock className="w-4 h-4 text-primary animate-spin" />
      case "failed":
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
            <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground">Generate comprehensive reports and insights</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Report Settings
            </Button>
            <Button>
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {performanceMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={`text-xs ${metric.trend.startsWith("+") ? "text-chart-3" : "text-destructive"}`}
                >
                  {metric.trend}
                </Badge>
                {index === 0 && <Activity className="h-4 w-4 text-chart-3" />}
                {index === 1 && <TrendingUp className="h-4 w-4 text-primary" />}
                {index === 2 && <BarChart3 className="h-4 w-4 text-chart-2" />}
                {index === 3 && <PieChart className="h-4 w-4 text-secondary" />}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{metric.current}%</div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Target</p>
                  <p className="text-sm font-medium">{metric.target}%</p>
                </div>
              </div>
              <div className="mt-2">
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(metric.current / metric.target) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="recent" className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recent">Recent Reports</TabsTrigger>
          <TabsTrigger value="generate">Generate New</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Recent Reports
              </CardTitle>
              <CardDescription>Your latest generated reports and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportsData.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 rounded-lg border bg-card/50">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(report.status)}
                      <div>
                        <h3 className="font-semibold">{report.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {report.type} • {report.size} • {report.format}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Fields: {Array.isArray(report.fields) ? report.fields.join(", ") : report.fields}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <Badge variant="outline" className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(report.generated).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" disabled={report.status !== "completed"}>
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" disabled={report.status !== "completed"}>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm" disabled={report.status !== "completed"}>
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generate">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate Custom Report</CardTitle>
                <CardDescription>Create a new report with custom parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="report-name">Report Name</Label>
                    <Input id="report-name" placeholder="Enter report name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="report-template">Template</Label>
                    <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a template" />
                      </SelectTrigger>
                      <SelectContent>
                        {reportTemplates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-range">Date Range</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select date range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="last7">Last 7 days</SelectItem>
                        <SelectItem value="last30">Last 30 days</SelectItem>
                        <SelectItem value="last90">Last 90 days</SelectItem>
                        <SelectItem value="custom">Custom range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fields">Fields to Include</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select fields" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Fields</SelectItem>
                        <SelectItem value="north">North Field Alpha</SelectItem>
                        <SelectItem value="south">South Field Beta</SelectItem>
                        <SelectItem value="east">East Field Gamma</SelectItem>
                        <SelectItem value="west">West Field Delta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Report Options</CardTitle>
                <CardDescription>Customize your report format and content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Output Format</Label>
                    <Select value={reportFormat} onValueChange={setReportFormat}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF Document</SelectItem>
                        <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                        <SelectItem value="csv">CSV Data</SelectItem>
                        <SelectItem value="html">HTML Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label>Include in Report</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="charts" checked={includeCharts} onCheckedChange={setIncludeCharts} />
                        <Label htmlFor="charts" className="text-sm">
                          Charts and Visualizations
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="raw-data" checked={includeRawData} onCheckedChange={setIncludeRawData} />
                        <Label htmlFor="raw-data" className="text-sm">
                          Raw Data Tables
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="recommendations" defaultChecked />
                        <Label htmlFor="recommendations" className="text-sm">
                          AI Recommendations
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="historical" defaultChecked />
                        <Label htmlFor="historical" className="text-sm">
                          Historical Comparisons
                        </Label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Delivery Method</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="How to receive the report" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="download">Download Now</SelectItem>
                        <SelectItem value="email">Email Report</SelectItem>
                        <SelectItem value="schedule">Schedule Delivery</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button className="flex-1">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-secondary" />
                Report Templates
              </CardTitle>
              <CardDescription>Pre-configured report templates for common use cases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reportTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="p-4 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{template.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {template.estimatedTime}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                    <div className="space-y-2 mb-4">
                      <p className="text-xs font-medium">Includes:</p>
                      <div className="flex flex-wrap gap-1">
                        {template.sections.map((section, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {section}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        Use Template
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-chart-3" />
                  Performance Trends
                </CardTitle>
                <CardDescription>Key metrics over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
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
                      <Line
                        type="monotone"
                        dataKey="health"
                        stroke="hsl(var(--chart-3))"
                        strokeWidth={3}
                        name="Health Score"
                      />
                      <Line
                        type="monotone"
                        dataKey="yield"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        name="Yield Efficiency"
                      />
                      <Line
                        type="monotone"
                        dataKey="efficiency"
                        stroke="hsl(var(--chart-2))"
                        strokeWidth={3}
                        name="Resource Efficiency"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Report Usage Statistics
                </CardTitle>
                <CardDescription>Most generated report types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { type: "Health", count: 45 },
                        { type: "Yield", count: 32 },
                        { type: "Financial", count: 28 },
                        { type: "Risk", count: 19 },
                        { type: "Comprehensive", count: 12 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="type" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="count" fill="hsl(var(--primary))" name="Reports Generated" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
