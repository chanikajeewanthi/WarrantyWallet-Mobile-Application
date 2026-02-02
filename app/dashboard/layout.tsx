import { Stack } from "expo-router";

export default function DashboardLayout(){
    return(
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: "#5A67F2" },
                headerTintColor: "white",
                headerTitleStyle: { fontWeight: "bold" },
            }}
        />    
    )
} 