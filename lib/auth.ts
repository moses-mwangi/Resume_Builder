// Demo user data store
const usersKey = "resume_builder_users";
const currentUserKey = "resume_builder_current_user";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  onboardingCompleted: boolean;
  profile?: {
    title: string;
    bio: string;
    skills: string[];
    experience: string;
    location: string;
    portfolio?: string;
  };
}

export interface ProfileData {
  title: string;
  bio: string;
  skills: string[];
  experience: string;
  location: string;
  portfolio?: string;
}

// Demo users
const demoUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    onboardingCompleted: true,
    profile: {
      title: "Senior Frontend Developer",
      bio: "Experienced developer with 8+ years in React and modern web technologies",
      skills: ["React", "Next.js", "TypeScript", "Tailwind"],
      experience: "8 years",
      location: "San Francisco, CA",
      portfolio: "https://john.dev",
    },
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    onboardingCompleted: true,
    profile: {
      title: "Product Manager",
      bio: "Strategic product leader with SaaS expertise and data-driven approach",
      skills: ["Product Strategy", "Agile", "Data Analysis", "UX Design"],
      experience: "6 years",
      location: "New York, NY",
      portfolio: "https://jane.design",
    },
  },
];

// Initialize localStorage
if (typeof window !== "undefined") {
  if (!localStorage.getItem(usersKey)) {
    localStorage.setItem(usersKey, JSON.stringify(demoUsers));
  }
}

export const auth = {
  register: (
    userData: Omit<User, "id" | "onboardingCompleted" | "profile">,
  ) => {
    const users: User[] = JSON.parse(localStorage.getItem(usersKey) || "[]");

    if (users.find((u) => u.email === userData.email)) {
      return { success: false, error: "Email already registered" };
    }

    const newUser: User = {
      id: Date.now().toString(),
      ...userData,
      onboardingCompleted: false,
      profile: undefined,
    };

    users.push(newUser);
    localStorage.setItem(usersKey, JSON.stringify(users));

    const { password, ...userWithoutPassword } = newUser;
    return { success: true, user: userWithoutPassword };
  },

  login: (email: string, password: string) => {
    const users: User[] = JSON.parse(localStorage.getItem(usersKey) || "[]");
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      return { success: false, error: "Invalid email or password" };
    }

    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(currentUserKey, JSON.stringify(userWithoutPassword));

    return { success: true, user: userWithoutPassword };
  },

  getCurrentUser: () => {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem(currentUserKey);
    return userStr ? JSON.parse(userStr) : null;
  },

  logout: () => {
    localStorage.removeItem(currentUserKey);
  },

  updateOnboarding: (userId: string, profileData: ProfileData) => {
    const users: User[] = JSON.parse(localStorage.getItem(usersKey) || "[]");
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex !== -1) {
      users[userIndex] = {
        ...users[userIndex],
        onboardingCompleted: true,
        profile: profileData,
      };
      localStorage.setItem(usersKey, JSON.stringify(users));

      const currentUser = auth.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        const { password: _, ...updatedUser } = users[userIndex];
        localStorage.setItem(currentUserKey, JSON.stringify(updatedUser));
      }

      return { success: true };
    }

    return { success: false, error: "User not found" };
  },
};
