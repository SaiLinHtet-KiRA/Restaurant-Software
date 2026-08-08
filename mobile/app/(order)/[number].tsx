import React from "react";
import SafeAreaViewLayout from "@/components/layout/SafeAreaView";
import StackLayout from "@/components/layout/StackLayout";
import OrderSection from "@/components/layout/OrderSection";
import Container from "@/components/layout/Container";
import OrderFooter from "@/components/footer/OrderFooter";

export default function ID() {
  return (
    <>
      <SafeAreaViewLayout>
        <StackLayout>
          <Container>
            <OrderSection />
          </Container>
        </StackLayout>
      </SafeAreaViewLayout>
      <OrderFooter />
    </>
  );
}
