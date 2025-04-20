
"use client"

import { useState, useEffect } from "react"
import { Edit, Trash, Search, UserPlus, Filter, RefreshCw } from "lucide-react"
import { useAdmin } from "@/hooks/useAdmin"
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import "@/styles/admin.css"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "react-hot-toast";

export default function UserManagement() {
  const { getUsers, deleteUser } = useAdmin()
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [sortBy, setSortBy] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState("desc")
  const [confirmDelete, setConfirmDelete] = useState(null)
  const { user } = useAuth();

  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const usersData = await getUsers({
        search: searchQuery,
        sort: `${sortBy}:${sortOrder}`,
      })
      setUsers(usersData)
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [sortBy, sortOrder])

  const handleSearch = (e) => {
    e.preventDefault()
    fetchUsers()
  }

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId)
      setUsers(users.filter((user) => user.id !== userId))
      setConfirmDelete(null)
      toast.success("User deleted successfully")
    } catch (error) {
      console.error("Error deleting user:", error)
      toast.error("Error deleting user")
    }
  }

  const filteredUsers = users.filter((user) => {
    if (roleFilter === "all") return true
    return user.role === roleFilter
  })

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-color dark:text-secondary-color">User Management</h1>
          <p className="text-dark-color dark:text-light-color opacity-80">Manage all users in the system</p>
        </div>

        <Link
          to="/admin/users/new"
          className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-primary-color text-white rounded-lg 
          hover:bg-secondary-color transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
        >
          <UserPlus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
          Add User
        </Link>
      </div>

      <div className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg shadow-lg border border-white border-opacity-20 p-4 md:p-6 animate-slide-up">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <form onSubmit={handleSearch} className="relative w-full md:w-64">
            <Input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 pl-10 glass dark:bg-dark-color dark:bg-opacity-50
                border border-white border-opacity-20 rounded-md 
                focus:outline-none focus:ring-2 focus:ring-primary-color dark:focus:ring-secondary-color
                text-dark-color dark:text-light-color transition-all"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-dark-color dark:text-light-color opacity-60" />
            <Button type="submit" className="hidden">
              Search
            </Button>
          </form>

          <div className="flex flex-wrap gap-2">
            <div className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg p-2 flex items-center gap-2">
              <Filter className="h-4 w-4 text-dark-color dark:text-light-color opacity-60" />
              <Select
                value={roleFilter}
                onValueChange={(value) => setRoleFilter(value)}
                className="text-sm glass dark:bg-dark-color dark:bg-opacity-50 border border-white border-opacity-20 rounded px-2 py-1 text-dark-color dark:text-light-color"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg p-2 flex items-center gap-2">
              <span className="text-sm text-dark-color dark:text-light-color">Sort by:</span>
              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value)}
                className="text-sm glass dark:bg-dark-color dark:bg-opacity-50 border border-white border-opacity-20 rounded px-2 py-1 text-dark-color dark:text-light-color"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="createdAt">Date Created</SelectItem>
                  <SelectItem value="taskCount">Task Count</SelectItem>
                </SelectContent>
              </Select>

              <Button
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                variant="ghost"
                size="icon"
                className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg text-dark-color dark:text-light-color hover:bg-white hover:bg-opacity-10 transition-colors"
                title="Refresh"
              >
                {sortOrder === "asc" ? "↑" : "↓"}
              </Button>
            </div>

            <Button
              onClick={fetchUsers}
              variant="ghost"
              size="icon"
              className="glass dark:bg-dark-color dark:bg-opacity-50 rounded-lg text-dark-color dark:text-light-color hover:bg-white hover:bg-opacity-10 transition-colors"
              title="Refresh"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-color dark:border-secondary-color"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-4 py-3 text-left text-xs font-medium text-dark-color dark:text-light-color opacity-70 uppercase tracking-wider">
                    User
                  </TableHead>
                  <TableHead className="px-4 py-3 text-left text-xs font-medium text-dark-color dark:text-light-color opacity-70 uppercase tracking-wider">
                    Email
                  </TableHead>
                  <TableHead className="px-4 py-3 text-left text-xs font-medium text-dark-color dark:text-light-color opacity-70 uppercase tracking-wider">
                    Role
                  </TableHead>
                  <TableHead className="px-4 py-3 text-left text-xs font-medium text-dark-color dark:text-light-color opacity-70 uppercase tracking-wider">
                    Tasks
                  </TableHead>
                  <TableHead className="px-4 py-3 text-left text-xs font-medium text-dark-color dark:text-light-color opacity-70 uppercase tracking-wider">
                    Created
                  </TableHead>
                  <TableHead className="px-4 py-3 text-right text-xs font-medium text-dark-color dark:text-light-color opacity-70 uppercase tracking-wider">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-white hover:bg-opacity-5 transition-colors">
                      <TableCell className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full glass flex items-center justify-center text-primary-color dark:text-secondary-color font-medium">
                            {user.name.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-dark-color dark:text-light-color">{user.name}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 whitespace-nowrap text-sm text-dark-color dark:text-light-color opacity-80">
                        {user.email}
                      </TableCell>
                      <TableCell className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            user.role === "admin"
                              ? "bg-primary-color bg-opacity-10 text-primary-color dark:text-secondary-color"
                              : "bg-info-color bg-opacity-10 text-info-color"
                          }`}
                        >
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell className="px-4 py-3 whitespace-nowrap text-sm text-dark-color dark:text-light-color opacity-80">
                        {user.taskCount || 0}
                      </TableCell>
                      <TableCell className="px-4 py-3 whitespace-nowrap text-sm text-dark-color dark:text-light-color opacity-80">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                       {user?.role === 'admin' && (
                        <div className="flex justify-end space-x-2">
                          <Link
                            to={`/admin/users/${user.id}/edit`}
                            className="text-primary-color dark:text-secondary-color hover:text-secondary-color dark:hover:text-primary-color transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" className="text-danger-color hover:text-red-700 transition-colors">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone and will also delete all tasks associated with this user.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteUser(user.id)}>Delete</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                         )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="px-4 py-8 text-center text-dark-color dark:text-light-color opacity-60">
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  )
}
