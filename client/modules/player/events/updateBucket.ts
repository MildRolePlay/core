let traffic = 1.0;
let civillian = 1.0

onNet('client:core:bucket:update', (vehicle: boolean, civ: boolean) => {
    traffic = vehicle ? 1.0 : 0.0;
    civillian = civ ? 1.0 : 0.0;
});

setTick(() => {
    SetPedDensityMultiplierThisFrame(civillian);
    SetScenarioPedDensityMultiplierThisFrame(civillian, civillian);

    SetVehicleDensityMultiplierThisFrame(traffic);
    SetRandomVehicleDensityMultiplierThisFrame(traffic);
    SetParkedVehicleDensityMultiplierThisFrame(traffic);
});