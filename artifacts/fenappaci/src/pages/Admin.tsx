import { useState, useEffect } from "react";
import { useListPurchaseRequests, useUpdatePurchaseRequestStatus, PurchaseRequestStatus, PurchaseRequest } from "@workspace/api-client-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LayoutDashboard, LogOut, FileText, CheckCircle2, Clock, Eye, TrendingUp, TrendingDown, BarChart3, RefreshCw, Plus, Edit2, Trash2, Save, X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

interface CommodityPrice {
  id: number;
  nameEn: string;
  nameFr: string;
  symbol: string;
  icon: string;
  price: number;
  unit: string;
  unitFr: string;
  changePercent: number;
  updatedAt: string;
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "fenappaci2024") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid password");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6">
            <span className="font-display font-bold text-white text-2xl">F</span>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white">
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return <AdminDashboard onLogout={() => setIsAuthenticated(false)} />;
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<'requests' | 'market'>('requests');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-foreground text-white py-4 px-6 shadow-md flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-bold font-display tracking-wide">FENAPPACI Admin</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-1 bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('requests')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'requests' ? 'bg-white text-gray-900' : 'text-gray-300 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" /> Demandes
            </button>
            <button
              onClick={() => setActiveTab('market')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'market' ? 'bg-white text-gray-900' : 'text-gray-300 hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" /> Marché
            </button>
          </div>
          <Button variant="ghost" onClick={onLogout} className="text-gray-300 hover:text-white hover:bg-white/10">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
        {activeTab === 'requests' ? <RequestsTab /> : <MarketTab />}
      </main>
    </div>
  );
}

function RequestsTab() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedRequest, setSelectedRequest] = useState<PurchaseRequest | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data, isLoading } = useListPurchaseRequests({
    status: statusFilter !== "all" ? statusFilter as any : undefined,
    limit: 50
  });

  const updateMutation = useUpdatePurchaseRequestStatus({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/api/admin/purchase-requests"] });
        toast({ title: "Status updated successfully" });
        setSelectedRequest(null);
      }
    }
  });

  const handleUpdateStatus = (id: number, status: string) => {
    updateMutation.mutate({ id, data: { status: status as keyof typeof PurchaseRequestStatus } });
  };

  const requests = data?.requests || [];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><FileText className="w-6 h-6" /></div>
          <div><p className="text-sm text-gray-500 font-medium">Total Requests</p><h3 className="text-2xl font-bold">{data?.total || 0}</h3></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center"><Clock className="w-6 h-6" /></div>
          <div><p className="text-sm text-gray-500 font-medium">Pending</p><h3 className="text-2xl font-bold">{requests.filter(r => r.status === 'pending').length}</h3></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><CheckCircle2 className="w-6 h-6" /></div>
          <div><p className="text-sm text-gray-500 font-medium">Responded</p><h3 className="text-2xl font-bold">{requests.filter(r => r.status === 'responded').length}</h3></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold">Purchase Requests</h2>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="reviewed">Reviewed</SelectItem>
              <SelectItem value="responded">Responded</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-12 text-center text-gray-500">Loading requests...</div>
          ) : requests.length === 0 ? (
            <div className="p-12 text-center text-gray-500">No requests found.</div>
          ) : (
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 text-gray-600 uppercase font-medium">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Name / Company</th>
                  <th className="px-6 py-4">Country</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {requests.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">{format(new Date(req.createdAt), 'MMM dd, yyyy')}</td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{req.fullName}</div>
                      <div className="text-gray-500 text-xs">{req.companyName || '-'}</div>
                    </td>
                    <td className="px-6 py-4">{req.country}</td>
                    <td className="px-6 py-4 font-medium">{req.product}</td>
                    <td className="px-6 py-4"><StatusBadge status={req.status} /></td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedRequest(req)}>
                        <Eye className="w-4 h-4 mr-2" /> View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {selectedRequest && (
        <Dialog open={!!selectedRequest} onOpenChange={(open) => !open && setSelectedRequest(null)}>
          <DialogContent className="max-w-2xl bg-white">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Request Details #{selectedRequest.id}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-6 py-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase">Contact Info</h4>
                <p className="mt-2 text-lg font-medium">{selectedRequest.fullName}</p>
                <p>{selectedRequest.companyName}</p>
                <p className="mt-2"><a href={`mailto:${selectedRequest.email}`} className="text-primary hover:underline">{selectedRequest.email}</a></p>
                <p><a href={`tel:${selectedRequest.phone}`} className="text-primary hover:underline">{selectedRequest.phone}</a></p>
                <p className="mt-2 text-gray-600">{selectedRequest.country}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase">Order Details</h4>
                <p className="mt-2"><span className="font-medium">Product:</span> {selectedRequest.product}</p>
                <p><span className="font-medium">Quantity:</span> {selectedRequest.quantity}</p>
                <p><span className="font-medium">Destination:</span> {selectedRequest.deliveryDestination}</p>
              </div>
              <div className="col-span-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Message</h4>
                <p className="text-gray-700 whitespace-pre-wrap">{selectedRequest.message || 'No additional message provided.'}</p>
              </div>
              <div className="col-span-2 border-t pt-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Update Status</h4>
                  <div className="flex gap-2">
                    <Button variant={selectedRequest.status === 'pending' ? 'default' : 'outline'} onClick={() => handleUpdateStatus(selectedRequest.id, 'pending')} disabled={updateMutation.isPending}>Pending</Button>
                    <Button variant={selectedRequest.status === 'reviewed' ? 'default' : 'outline'} className={selectedRequest.status === 'reviewed' ? 'bg-blue-600' : ''} onClick={() => handleUpdateStatus(selectedRequest.id, 'reviewed')} disabled={updateMutation.isPending}>Reviewed</Button>
                    <Button variant={selectedRequest.status === 'responded' ? 'default' : 'outline'} className={selectedRequest.status === 'responded' ? 'bg-green-600' : ''} onClick={() => handleUpdateStatus(selectedRequest.id, 'responded')} disabled={updateMutation.isPending}>Responded</Button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Submitted on</p>
                  <p className="font-medium">{format(new Date(selectedRequest.createdAt), 'MMM dd, yyyy HH:mm')}</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

function MarketTab() {
  const [prices, setPrices] = useState<CommodityPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<{ price: string; changePercent: string; icon: string }>({ price: '', changePercent: '', icon: '' });
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCommodity, setNewCommodity] = useState({ nameEn: '', nameFr: '', symbol: '', icon: '🌾', price: '', unit: 'USD/ton', unitFr: 'USD/tonne', changePercent: '0' });
  const { toast } = useToast();

  const fetchPrices = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/commodity-prices`);
      const json = await res.json();
      if (json.prices?.length === 0) {
        await handleSeed(true);
      } else {
        setPrices(json.prices || []);
      }
    } catch {
      toast({ title: "Error loading prices", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSeed = async (silent = false) => {
    setSeeding(true);
    try {
      await fetch(`${API_BASE}/api/admin/commodity-prices/seed`, { method: 'POST' });
      await fetchPrices();
      if (!silent) toast({ title: "Market data seeded successfully!" });
    } catch {
      toast({ title: "Error seeding data", variant: "destructive" });
    } finally {
      setSeeding(false);
    }
  };

  useEffect(() => { fetchPrices(); }, []);

  const startEdit = (p: CommodityPrice) => {
    setEditingId(p.id);
    setEditValues({ price: p.price.toString(), changePercent: p.changePercent.toString(), icon: p.icon });
  };

  const cancelEdit = () => { setEditingId(null); };

  const saveEdit = async (id: number) => {
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/commodity-prices/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price: parseFloat(editValues.price),
          changePercent: parseFloat(editValues.changePercent),
          icon: editValues.icon,
        }),
      });
      if (!res.ok) throw new Error();
      toast({ title: "Price updated!" });
      setEditingId(null);
      fetchPrices();
    } catch {
      toast({ title: "Error saving price", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Delete ${name}?`)) return;
    try {
      await fetch(`${API_BASE}/api/admin/commodity-prices/${id}`, { method: 'DELETE' });
      toast({ title: "Deleted!" });
      fetchPrices();
    } catch {
      toast({ title: "Error deleting", variant: "destructive" });
    }
  };

  const handleAdd = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/commodity-prices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newCommodity, price: parseFloat(newCommodity.price), changePercent: parseFloat(newCommodity.changePercent) }),
      });
      if (!res.ok) throw new Error();
      toast({ title: "Commodity added!" });
      setShowAddForm(false);
      setNewCommodity({ nameEn: '', nameFr: '', symbol: '', icon: '🌾', price: '', unit: 'USD/ton', unitFr: 'USD/tonne', changePercent: '0' });
      fetchPrices();
    } catch {
      toast({ title: "Error adding commodity", variant: "destructive" });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Market Price Management</h2>
          <p className="text-sm text-gray-500 mt-1">Edit commodity prices shown on the public market page</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => fetchPrices()} className="border-gray-200">
            <RefreshCw className="w-4 h-4 mr-2" /> Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleSeed()} disabled={seeding} className="border-orange-200 text-orange-700 hover:bg-orange-50">
            {seeding ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
            Reset to Defaults
          </Button>
          <Button size="sm" onClick={() => setShowAddForm(true)} className="bg-secondary hover:bg-secondary/90 text-white">
            <Plus className="w-4 h-4 mr-2" /> Add Commodity
          </Button>
        </div>
      </div>

      {showAddForm && (
        <div className="bg-white border border-green-200 rounded-2xl p-6 mb-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Plus className="w-4 h-4 text-green-600" /> Add New Commodity</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div><label className="text-xs font-medium text-gray-500 block mb-1">Name (EN)</label><Input value={newCommodity.nameEn} onChange={e => setNewCommodity(s => ({ ...s, nameEn: e.target.value }))} placeholder="Coffee" /></div>
            <div><label className="text-xs font-medium text-gray-500 block mb-1">Name (FR)</label><Input value={newCommodity.nameFr} onChange={e => setNewCommodity(s => ({ ...s, nameFr: e.target.value }))} placeholder="Café" /></div>
            <div><label className="text-xs font-medium text-gray-500 block mb-1">Symbol</label><Input value={newCommodity.symbol} onChange={e => setNewCommodity(s => ({ ...s, symbol: e.target.value.toUpperCase() }))} placeholder="COFFEE" /></div>
            <div><label className="text-xs font-medium text-gray-500 block mb-1">Icon (emoji)</label><Input value={newCommodity.icon} onChange={e => setNewCommodity(s => ({ ...s, icon: e.target.value }))} placeholder="☕" /></div>
            <div><label className="text-xs font-medium text-gray-500 block mb-1">Price</label><Input type="number" value={newCommodity.price} onChange={e => setNewCommodity(s => ({ ...s, price: e.target.value }))} placeholder="4320" /></div>
            <div><label className="text-xs font-medium text-gray-500 block mb-1">Unit (EN)</label><Input value={newCommodity.unit} onChange={e => setNewCommodity(s => ({ ...s, unit: e.target.value }))} placeholder="USD/ton" /></div>
            <div><label className="text-xs font-medium text-gray-500 block mb-1">Unit (FR)</label><Input value={newCommodity.unitFr} onChange={e => setNewCommodity(s => ({ ...s, unitFr: e.target.value }))} placeholder="USD/tonne" /></div>
            <div><label className="text-xs font-medium text-gray-500 block mb-1">Change %</label><Input type="number" value={newCommodity.changePercent} onChange={e => setNewCommodity(s => ({ ...s, changePercent: e.target.value }))} placeholder="0.5" step="0.1" /></div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button size="sm" onClick={handleAdd} className="bg-secondary hover:bg-secondary/90 text-white"><Save className="w-4 h-4 mr-2" /> Add</Button>
            <Button size="sm" variant="outline" onClick={() => setShowAddForm(false)}><X className="w-4 h-4 mr-2" /> Cancel</Button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500 flex items-center justify-center gap-3">
            <RefreshCw className="w-5 h-5 animate-spin text-orange-500" /> Loading market data...
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase font-medium text-xs">
              <tr>
                <th className="px-4 py-3">Commodity</th>
                <th className="px-4 py-3">Symbol</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Unit</th>
                <th className="px-4 py-3">Change %</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {prices.map((p) => (
                <tr key={p.id} className={`hover:bg-gray-50 transition-colors ${editingId === p.id ? 'bg-orange-50' : ''}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {editingId === p.id
                        ? <Input value={editValues.icon} onChange={e => setEditValues(s => ({ ...s, icon: e.target.value }))} className="w-14 text-center h-8" />
                        : <span className="text-xl">{p.icon}</span>
                      }
                      <div>
                        <div className="font-semibold text-gray-900">{p.nameEn}</div>
                        <div className="text-xs text-gray-500">{p.nameFr}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{p.symbol}</td>
                  <td className="px-4 py-3">
                    {editingId === p.id
                      ? <Input type="number" value={editValues.price} onChange={e => setEditValues(s => ({ ...s, price: e.target.value }))} className="w-28 h-8" step="0.01" />
                      : <span className="font-bold text-gray-900">${typeof p.price === 'number' ? p.price.toLocaleString() : p.price}</span>
                    }
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{p.unit}</td>
                  <td className="px-4 py-3">
                    {editingId === p.id
                      ? <Input type="number" value={editValues.changePercent} onChange={e => setEditValues(s => ({ ...s, changePercent: e.target.value }))} className="w-24 h-8" step="0.1" />
                      : (
                        <span className={`flex items-center gap-1 font-semibold text-sm ${parseFloat(String(p.changePercent)) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {parseFloat(String(p.changePercent)) >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                          {parseFloat(String(p.changePercent)) >= 0 ? '+' : ''}{parseFloat(String(p.changePercent)).toFixed(2)}%
                        </span>
                      )
                    }
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">{format(new Date(p.updatedAt), 'MMM dd, HH:mm')}</td>
                  <td className="px-4 py-3">
                    {editingId === p.id ? (
                      <div className="flex gap-1">
                        <Button size="sm" onClick={() => saveEdit(p.id)} disabled={saving} className="h-7 bg-green-600 hover:bg-green-700 text-white px-2">
                          <Save className="w-3.5 h-3.5" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={cancelEdit} className="h-7 px-2">
                          <X className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => startEdit(p)} className="h-7 text-orange-600 hover:bg-orange-50 px-2">
                          <Edit2 className="w-3.5 h-3.5" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDelete(p.id, p.nameEn)} className="h-7 text-red-500 hover:bg-red-50 px-2">
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'pending': return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
    case 'reviewed': return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Reviewed</Badge>;
    case 'responded': return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Responded</Badge>;
    default: return <Badge variant="outline">{status}</Badge>;
  }
}
