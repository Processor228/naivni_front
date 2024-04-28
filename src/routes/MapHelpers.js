
export const transport_classes = {
    0: 'motorcycle',
    1: 'car',
    2: 'car-with-trailer',
    3: 'truck',
    4: 'road-train',
    5: 'bus'
}
export const transport_colors = {
    0: 'blue',
    1: 'green',
    2: 'yellow',
    3: 'red',
    4: 'pink',
    5: 'purple'
}

export function carStyleFactory(transport_type) {
    const color = transport_colors[transport_type];
    return `background: ${color}; border-radius: 100%; display: block; width: 8px; height: 8px;`;
}

