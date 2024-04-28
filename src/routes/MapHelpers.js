
export const transport_classes = {
    0: 'motorcycle',
    1: 'car',
    2: 'car-with-trailer',
    3: 'truck',
    4: 'road-train',
    5: 'bus'
}
export const transport_colors = {
    0: '#fced01',
    1: '#3e7d22',
    2: '#3a0464',
    3: '#053971',
    4: '#04a8ab',
    5: '#ffa711'
}

export function carStyleFactory(transport_type) {
    const color = transport_colors[transport_type];
    return `background: ${color}; border-radius: 100%; display: block; width: 8px; height: 8px;`;
}

