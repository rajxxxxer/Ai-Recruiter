'use client'
import React, { useContext, useEffect, useState } from 'react'
import { supabase } from './lib/supabaseClient'
import UserContext from './context/userContext'

const Provider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const initUser = async () => {
      try {
        // 1. Check session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError) {
          console.error('Error fetching session:', sessionError)
          return
        }

        if (!session?.user) {
          console.log('No active session')
          return
        }

        const currentUser = session.user
        setUser(currentUser)
        console.log('Logged in user:', currentUser)

        // 2. Check if user exists in DB
        const { data: Users, error: userError } = await supabase
          .from('Users')
          .select('*')
          .eq('email', currentUser.email)

        if (userError) {
          console.error('Error fetching user from DB:', userError)
          return
        }

        // 3. Insert user if not exists
        if (!Users || Users.length === 0) {
          const { data: inserted, error: insertError } = await supabase
            .from('Users')
            .insert([
              {
                email: currentUser.email,
                name: currentUser.user_metadata.name,
                picture: currentUser.user_metadata.picture,
              },
            ])
            .select()

          if (insertError) {
            console.error('Error inserting new user:', insertError)
          } else if (inserted && inserted.length > 0) {
            setUser(inserted[0])
            console.log('New user inserted:', inserted[0])
          }
        }
      } catch (err) {
        console.error('Unexpected error:', err)
      }
    }

    initUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)

export default Provider
