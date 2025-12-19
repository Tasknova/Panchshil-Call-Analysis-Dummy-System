import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  User,
  ArrowLeft,
  FolderOpen
} from "lucide-react";
import { useLeads, useDeleteLead, useLeadGroups } from "@/hooks/useSupabaseData";
import { useToast } from "@/hooks/use-toast";
import { Lead } from "@/lib/supabase";
import EditLeadModal from "./EditLeadModal";

// Helper function to get property type tags for leads
const getPropertyTypeTags = (leadName: string): string[] => {
  const name = leadName.toLowerCase();
  if (name.includes('rajpal') || name.includes('singh')) return ['Commercial', 'Office Space'];
  if (name.includes('aarav') || name.includes('varma')) return ['Residential', 'Luxury Villa'];
  if (name.includes('jack')) return ['Commercial', 'Retail'];
  if (name.includes('smith')) return ['Residential', 'Apartment'];
  if (name.includes('johnson')) return ['Commercial', 'Warehouse'];
  return ['Residential', 'Plot'];
};

// Helper function to get description for specific leads
const getLeadDescription = (leadName: string, currentDescription?: string): string => {
  const name = leadName.toLowerCase();
  if (name.includes('rajpal') || name.includes('singh')) {
    return 'Interested in premium office space for expanding IT startup, budget-conscious';
  }
  if (name.includes('aarav') || name.includes('varma')) {
    return 'Looking for luxury villa in gated community with modern amenities';
  }
  if (name.includes('jack')) {
    return 'Seeking retail space in high-traffic commercial area for new business';
  }
  return currentDescription || 'Potential property buyer';
};

export default function GroupLeadsPage() {
  const { groupId } = useParams<{ groupId: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [deletingLead, setDeletingLead] = useState<Lead | null>(null);
  
  const navigate = useNavigate();
  const { data: leads, isLoading: leadsLoading, error: leadsError } = useLeads(groupId);
  const { data: leadGroups, isLoading: groupsLoading } = useLeadGroups();
  const deleteLead = useDeleteLead();
  const { toast } = useToast();

  // Find the current group
  const currentGroup = leadGroups?.find(group => group.id === groupId);

  // Filter leads by search term
  const filteredLeads = leads?.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.contact.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleDeleteLead = async (lead: Lead) => {
    try {
      await deleteLead.mutateAsync(lead.id);
      toast({
        title: "Success",
        description: "Lead deleted successfully",
      });
      setDeletingLead(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete lead",
        variant: "destructive",
      });
    }
  };

  // Handle loading states
  if (groupsLoading || leadsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-blue mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading leads...</p>
        </div>
      </div>
    );
  }

  // Handle errors
  if (leadsError) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">Error loading leads: {leadsError.message}</p>
      </div>
    );
  }

  // Handle case when group doesn't exist
  if (!currentGroup) {
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <Button variant="outline" onClick={() => navigate('/')} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Groups
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Group Not Found</h1>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">The requested group could not be found</h3>
              <p className="text-muted-foreground mb-4">
                The group may have been deleted or you don't have access to it.
              </p>
              <Button onClick={() => navigate('/')}>
                Go Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="outline" onClick={() => navigate('/')} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Groups
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Leads in "{currentGroup.group_name}"
            </h1>
            <p className="text-muted-foreground">
              Viewing leads for this specific group
            </p>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Leads in Group</CardTitle>
          <User className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{filteredLeads.length}</div>
          <p className="text-xs text-muted-foreground">
            {filteredLeads.length === 1 ? 'Lead' : 'Leads'} in "{currentGroup.group_name}" group
          </p>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Leads in "{currentGroup.group_name}"</CardTitle>
          <CardDescription>
            Search and manage leads in this group
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search leads by name, email, or contact..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          {filteredLeads.length === 0 ? (
            <div className="text-center py-8">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No leads found in this group</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm 
                  ? "No leads match your search criteria." 
                  : "This group doesn't have any leads yet."
                }
              </p>
              <Button onClick={() => navigate('/')}>
                Return to Dashboard
              </Button>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Property Type</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-[50px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {getPropertyTypeTags(lead.name).map((tag, index) => (
                            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          {lead.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          {lead.contact}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {getLeadDescription(lead.name, lead.description).length > 50 
                            ? `${getLeadDescription(lead.name, lead.description).substring(0, 50)}...` 
                            : getLeadDescription(lead.name, lead.description)
                          }
                        </span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setEditingLead(lead)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => setDeletingLead(lead)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Lead Modal */}
      {editingLead && (
        <EditLeadModal 
          lead={editingLead}
          isOpen={!!editingLead} 
          onClose={() => setEditingLead(null)} 
        />
      )}

      {/* Delete Confirmation Dialog */}
      {deletingLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">Delete Lead</h3>
            <p className="text-muted-foreground mb-4">
              Are you sure you want to delete "{deletingLead.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setDeletingLead(null)}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => deletingLead && handleDeleteLead(deletingLead)}
                disabled={deleteLead.isPending}
              >
                {deleteLead.isPending ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}