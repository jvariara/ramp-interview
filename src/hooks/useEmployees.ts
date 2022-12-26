import { useCallback, useState } from "react"
import { Employee } from "../utils/types"
import { useCustomFetch } from "./useCustomFetch"
import { EmployeeResult } from "./types"

export function useEmployees(): EmployeeResult {
  const { fetchWithCache, loading } = useCustomFetch()
  const [employees, setEmployees] = useState<Employee[] | null>(null)
  const [employeeLoading, setEmployeeLoading] = useState(true)

  const fetchAll = useCallback(async () => {
    setEmployeeLoading(true)
    const employeesData = await fetchWithCache<Employee[]>("employees")
    setEmployees(employeesData)
    setEmployeeLoading(false)
  }, [fetchWithCache])

  const invalidateData = useCallback(() => {
    setEmployees(null)
  }, [])

  return { data: employees, loading, fetchAll, invalidateData }
}
